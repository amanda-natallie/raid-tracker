import faker from 'faker';
import { uuid10 } from '../helpers/utils';
import {
    OperatorProps,
    PaymentProps,
    RepresentativeProps,
    CenterProps,
    PurchaseGroupProps,
    VendorProps,
    AccountGroup,
    ProductProps,
    RequestForQuotationProps,
} from './entities';

faker.locale = 'pt_BR';

//generateRepresentatives based on generateUser and RepresentativeProps
export const generateRepresentatives = (quantity: number): Array<RepresentativeProps> => {
    const representatives: Array<RepresentativeProps> = [];
    for (let i = 0; i < quantity; i++) {
        const representative: RepresentativeProps = {
            id: faker.unique(faker.datatype.number),
            name: faker.name.findName(),
            email: faker.internet.email(),
            avatar: faker.internet.avatar(),
            idVendor: faker.unique(faker.datatype.number),
        };
        representatives.push(representative);
    }
    return representatives;
};

//generateCenters based on generateUser and CenterProps
export const generateCenters = (quantity: number): Array<CenterProps> => {
    const centers: Array<CenterProps> = [];
    for (let i = 0; i < quantity; i++) {
        const center: CenterProps = {
            id: faker.unique(faker.datatype.number),
            name: faker.company.companyName(),
            languageCode: 'pt',
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country(),
        };
        centers.push(center);
    }
    return centers;
};

//generatePurchaseGroups based on generateUser and PurchaseGroupProps
export const generatePurchaseGroups = (quantity: number): Array<PurchaseGroupProps> => {
    const purchaseGroups: Array<PurchaseGroupProps> = [];
    for (let i = 0; i < quantity; i++) {
        const purchaseGroup: PurchaseGroupProps = {
            id: faker.unique(faker.datatype.number),
            name: faker.company.companyName(),
            description: faker.lorem.paragraph(),
            phone: faker.phone.phoneNumber(),
            mail: faker.internet.email(),
        };
        purchaseGroups.push(purchaseGroup);
    }
    return purchaseGroups;
};

//generateOperatorss based on generateUser and OperatorProps
export const generateOperators = (quantity: number): Array<OperatorProps> => {
    const operators: Array<OperatorProps> = [];
    for (let i = 0; i < quantity; i++) {
        const operator: OperatorProps = {
            id: faker.unique(faker.datatype.number),
            name: faker.name.findName(),
            email: faker.internet.email(),
            avatar: faker.internet.avatar(),
            center: generateCenters(1)[0],
            purchaseGroup: generatePurchaseGroups(1)[0],
        };
        operators.push(operator);
    }
    return operators;
};

//generatePayments based on generateUser and PaymentProps
export const generatePayments = (quantity: number): Array<PaymentProps> => {
    const payments: Array<PaymentProps> = [];
    for (let i = 0; i < quantity; i++) {
        const payment: PaymentProps = {
            id: faker.unique(faker.datatype.number),
            country: faker.address.country(),
            bankKey: faker.finance.account(),
            agency: faker.finance.account(),
            account: faker.finance.account(),
            accountType: faker.finance.accountName(),
            accountHolder: faker.name.findName(),
        };
        payments.push(payment);
    }
    return payments;
};

//generateVendors based on generateUser and VendorProps
export const generateVendors = (quantity: number): Array<VendorProps> => {
    const vendors: Array<VendorProps> = [];
    for (let i = 0; i < quantity; i++) {
        const vendor: VendorProps = {
            id: faker.unique(faker.datatype.number),
            code: faker.finance.account(4),
            accountGroup: faker.random.arrayElement(Object.values(AccountGroup).filter((e) => typeof e === 'string')),
            searchTerm: faker.finance.account(4),
            name: faker.company.companyName(),
            phone: faker.phone.phoneNumber(),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
            payments: generatePayments(1),
            representative: generateRepresentatives(1)[0],
            stdDeliveryTime: faker.lorem.word(),
            stdQty: faker.datatype.number(),
            minimumQty: faker.datatype.number(),
        };
        vendors.push(vendor);
    }
    return vendors;
};

//generatePurchaseOrganizations based on generateUser and PurchaseOrganizationProps

//generateProducts based on ProductProps
export const generateProducts = (quantity: number): Array<ProductProps> => {
    const products: Array<ProductProps> = [];
    for (let i = 0; i < quantity; i++) {
        const product: ProductProps = {
            id: faker.unique(faker.datatype.number),
            code: faker.finance.account(5),
            material: faker.commerce.productMaterial(),
            description: faker.lorem.paragraph(),
            materialGroup: faker.random.arrayElement(['Monitores', 'Mouse', 'Teclado', 'Impressora']),
            qtyRequested: faker.datatype.number(),
            deliveryEstimation: faker.lorem.word(),
            requestDate: faker.date.past(),
            releaseDate: faker.date.future(),
            valuationPrice: faker.finance.amount(0, 100, 2),
            status: faker.random.arrayElement(['Liberado', 'Bloqueado', 'Devolvido']),
            createdBy: generateOperators(1)[0].name,
            modifiedBy: generateOperators(1)[0].name,
            notes: faker.lorem.paragraph(),
        };
        products.push(product);
    }
    return products;
};

//generateRequestForQuotation based on generateUser and RequestForQuotationProps
export const generateRequestForQuotation = (quantity: number): Array<RequestForQuotationProps> => {
    const requestForQuotation: Array<RequestForQuotationProps> = [];
    for (let i = 0; i < quantity; i++) {
        const rfq: RequestForQuotationProps = {
            purchaseRequisition: null,
            type: faker.random.arrayElement(['AB', 'AN']),
            requestDate: faker.date.past(),
            reference: {
                name: faker.company.companyName(),
                number: faker.datatype.number(),
                phone: faker.phone.phoneNumber(),
            },
            RFQColet: uuid10(),
        };
        requestForQuotation.push(rfq);
    }
    return requestForQuotation;
};
