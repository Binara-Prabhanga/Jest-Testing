import axios, { AxiosInstance } from "axios";

export class DynamicsCRMConnector {
    private apiClient: AxiosInstance;

    constructor(config: { tenantUrl: string; accessToken: string | null }) {
        if (!config.tenantUrl || !config.accessToken) {
            throw new Error('Tenant URL and Access Token must be provided');
        }

        this.apiClient = axios.create({
            baseURL: config.tenantUrl + '/api/data/v9.2',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.accessToken}`,
                Prefer: 'return=representation',
                'OData-MaxVersion': '4.0',
                'OData-Version': '4.0',
            },
        });
    }

    //Account CRUD
    public async GetAllAccount(): Promise<JSON> {
        const response = await this.apiClient.get('/accounts', {
            params: {},
        });

        return response.data;
    }

    public async GetAccountsAfterSpecificDate(date: Date): Promise<JSON> {
        const response = await this.apiClient.get('/accounts', {
            params: {
                $select: 'accountid, name',
                $filter: 'createdon gt ' + date.toISOString() + ' or modifiedon gt ' + date.toISOString(),
            },
        });

        return response.data;
    }

    public async GetAccountById(id: String): Promise<JSON> {
        const response = await this.apiClient.get('/accounts(' + id + ')', {});

        return response.data;
    }

    public async CreateAccount(data: AccountCreate): Promise<JSON> {
        const response = await this.apiClient.post('/accounts', data);

        return response.data;
    }

    public async UpdateAccount(data: Account): Promise<JSON> {
        const response = await this.apiClient.patch('/accounts(' + data.accountid + ')', data);

        return response.data;
    }

    public async DeleteAccount(id: string): Promise<any> {
        const response = await this.apiClient.delete('/accounts(' + id + ')');

        return response.data;
    }

}