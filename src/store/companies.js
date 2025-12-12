import CompanyService from '@/services/company.service';  
import Company from '@/store/models/company';  
  
function getCompanyById(companyId) {  
  return Company.query().find(companyId);  
}  
  
export default {  
  namespaced: true,  
  state: {  
    companyId: null,  
    isModalOpen: false,  
  },  
  mutations: {  
    companyId(state, companyId) {  
      state.companyId = companyId;  
    },  
    isModalOpen(state, isOpen) {  
      state.isModalOpen = isOpen;  
    },  
  },  
  actions: {  
    init({ dispatch }) {  
      return dispatch('getCompanies');  
    },  
    terminate() {  
      return Company.deleteAll();  
    },  
    async getCompanies() {  
      const companies = await CompanyService.getCompanies();  
      await Company.create({ data: companies });  
      return companies;  
    },  
    async getClient({ commit }, companyId) {  
      const company = await CompanyService.getCompany(companyId);  
      commit('companyId', company.id);  
      Company.insert({ data: company });  
    },  
    async createNewCompany({ dispatch }, company) {  
      if (!company.hasOwnProperty('id')) {  
        company = new Company(company);  
      }  
      const res = await CompanyService.createCompany(company);  
      await Company.insert({ data: res });  
      return getCompanyById(res.id);  
    },  
    companyProps(store, payload) {  
      return Company.update({  
        where: payload.companyId,  
        data: payload.props,  
      });  
    },  
    async updateCompany({ dispatch }, payload) {  
      if (payload.props) {  
        await dispatch('companyProps', payload);  
      }  
      return CompanyService.updateCompany(getCompanyById(payload.companyId));  
    },  
    async openNewCompanyModal({ commit }) {  
      const company = await Company.createNew();  
      commit('companyId', company.id);  
      commit('isModalOpen', true);  
    },  
    async deleteCompany(store, companyId) {  
      const res = await CompanyService.deleteCompany(companyId);  
      await Company.delete(companyId);  
      return res;  
    },  
  },  
  getters: {  
    company(state) {  
      return getCompanyById(state.companyId);  
    },  
    all() {  
      return Company.query()  
        .where('$isNew', false)  
        .get();  
    },  
  },  
};