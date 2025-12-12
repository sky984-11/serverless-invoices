import { Model } from '@vuex-orm/core';  
import { uuidv4 } from '@/utils/helpers';  
  
export default class Company extends Model {  
  static entity = 'companies';  
    
  static fields() {  
    return {  
      id: this.attr(() => uuidv4()),  
      company_name: this.attr(''),  
      company_address: this.attr(''),  
      company_postal_code: this.attr(''),  
      company_city: this.attr(''),  
      company_county: this.attr(''),  
      company_country: this.attr(''),  
      website: this.attr(''),  
      contact_email: this.attr(''),  
      contact_phone: this.attr(''),  
      created_at: this.attr(''),  
      updated_at: this.attr(''),  
    };  
  }  
}