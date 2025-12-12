import data from '@/services/data.service';  
  
class CompanyService {  
  async getCompanies() {  
    return data.get('companies');  
  }  
  
  async getCompany(companyId) {  
    return data.get(`companies/${companyId}`);  
  }  
  
  async createCompany(company) {  
    return data.post('companies', company);  
  }  
  
  async updateCompany(company) {  
    return data.patch(`companies/${company.id}`, company);  
  }  
  
  async deleteCompany(companyId) {  
    return data.delete(`companies/${companyId}`);  
  }  
}  
  
export default new CompanyService();