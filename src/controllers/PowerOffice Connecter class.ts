import axios, { AxiosInstance } from "axios";

export class PowerOfficeConnector {
    private apiClient: AxiosInstance;

    constructor(config: { tenantUrl: string; accessToken: string }) {
        if (!config.tenantUrl || !config.accessToken) {
            throw new Error('Access Token and Tenent URL must be provided');
        }

        this.apiClient = axios.create({
            baseURL: 'https://goapi.poweroffice.net/v2',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.accessToken}`,
            },
        });
    }


    //Customers CRUD --> Business Customer
    public async getCustomerById(id: number): Promise<JSON> {
        const response = await this.apiClient.get(`/Customers/${id}`);
        return response.data;
    }

    public async updateCustomer(id: number, updates: any): Promise<JSON> {
        const response = await this.apiClient.patch(`/Customers/${id}`, updates);
        return response.data;
    }

    public async deleteCustomer(id: number): Promise<JSON> {
        const response = await this.apiClient.delete(`/Customers/${id}`);
        return response.data;
    }

    public async createCustomer(data: any): Promise<JSON> {
        const response = await this.apiClient.post(`/Customers`, data);
        return response.data;
    }

    public async getCustomers(filters: any): Promise<JSON> {
        const response = await this.apiClient.get(`/Customers`, {
            params: filters,
        });
        return response.data;
    }

    //Accounting Settings CRUD --> ????
    public async getGeneralLedgerAccounts(filters: any): Promise<JSON> {
        const response = await this.apiClient.get('/GeneralLedgerAccounts', {
            params: filters,
        });
        return response.data;
    }

    public async getGeneralLedgerAccountById(id: number): Promise<any> {
        const response = await this.apiClient.get(`/GeneralLedgerAccounts/${id}`);

        return response.data;
    }

    public async updateGeneralLedgerAccount(id: number, data: any): Promise<any> {
        const response = await this.apiClient.patch(`/GeneralLedgerAccounts/${id}`, data);

        return response.data;
    }

    public async deleteGeneralLedgerAccount(id: number): Promise<void> {
        await this.apiClient.delete(`/GeneralLedgerAccounts/${id}`);
    }

    //Organization Settings GET --> Tenet
    public async getOrganizationSettings(filters: any): Promise<JSON> {
        const response = await this.apiClient.get('/OrganizationSettings', {
            params: filters,
        });
        return response.data;
    }


    //Contact Persons CRUD --> Person Customer
    public async getContactPersons(contactId: number, filters?: any): Promise<JSON> {
        const response = await this.apiClient.get(`/ContactPersons/${contactId}`, {
            params: filters,
        });
        return response.data;
    }

    public async createContactPerson(contactId: number, contactPersonData: any): Promise<JSON> {
        const response = await this.apiClient.post(`/ContactPersons/${contactId}`, contactPersonData);
        return response.data;
    }

    public async getContactPersonById(contactId: number, id: number): Promise<JSON> {
        const response = await this.apiClient.get(`/ContactPersons/${contactId}/${id}`);
        return response.data;
    }
    public async updateContactPerson(contactId: number, id: number, contactPersonData: any): Promise<JSON> {
        const response = await this.apiClient.patch(`/ContactPersons/${contactId}/${id}`, contactPersonData);
        return response.data;
    }

    public async deleteContactPerson(contactId: number, id: number): Promise<void> {
        await this.apiClient.delete(`/ContactPersons/${contactId}/${id}`);
    }
}


