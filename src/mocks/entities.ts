import React from 'react';

export enum TicketStatus {
    'Aberto',
    'Solucionado',
    'Cancelado',
    'Aguardando Fornecedor',
    'Respondido',
}
export enum OrderStatus {
    DRAFT = 'Rascunho',
    ORDER_CANCELED = 'Ordem Cancelada',
    ORDER_CLOSED = 'Ordem Fechada', //tipo PR/Mr fechada, serve pra consulta
    ORDER_CREATED = 'Ordem Criada',
    ORDER_RECEIVED = 'Ordem Recebida',
    ORDER_SENT = 'Ordem Enviada', // enviado pro fornecedor
    ORDER_SOLVED = 'Ordem Concluída',
    PAUSED = 'Pausado',
    PENDING_APPROVAL = 'Aguardando Aprovação',
    REQUISITION_CREATED = 'Requisição Criada',
    REQUISITION_SENT = 'Requisição Enviada', //enviado pro senior
    SENIOR_APPROVED = 'Solicitação Aprovada',
    SENIOR_REPROVED = 'Solicitação Reprovada',
    WAITING_CONTRACT = 'Aguardando Contrato',
    WAITING_PAYMENT = 'Aguardando Pagamento',
}

export enum UserRole {
    'admin',
    'operator',
    'representative',
}

export enum OrderType {
    'EB - Req. compra normal',
    'FO - Req. compra quadro',
    'IN - Req. compra Comercio I',
    'MV - Relação servs. modelo',
    'NB - Req. compra normal',
    'RV - Req. contrato básico ',
}

export enum DeliveryPlace {
    'Depósito',
    'Planta',
}

export enum AccountGroup {
    'Fornecedores',
    'Fornecedores Ocasionais',
    'Fornecedores de Serviços',
    'Fornecedores de Mercadoria',
}

/* TICKET & NOTIFICATIONS ----------- */
export interface ToolbarProps {
    id: number;
    title: string;
    description: string;
    url: string;
}

export type AttachmentProps = Omit<ToolbarProps, 'description'>;

export interface MessageProps extends ToolbarProps {
    ticketid: number;
    when?: string;
    from?: string;
    attachments?: AttachmentProps[];
}

export interface TicketProps {
    id: number;
    title: string;
    orderNumber: number;
    subject: string;
    status: TicketStatus;
    authorid: number;
    supplierName: string;
    opennedAt: Date;
    updatedAt: Date;
}

export interface NotificationProps extends ToolbarProps {
    icon?: React.ReactNode;
}

/*ok*/ export interface UserProps {
    id: number;
    userId: number;
    email: string;
    dashboardRole: UserRole | string;
}

/* USERS ----------- */

/*ok*/ export interface OperatorProps {
    id: number;
    name: string;
    email: string;
    avatar: string;
    center: CenterProps;
    purchaseGroup: PurchaseGroupProps;
}

/*ok*/ export interface RepresentativeProps {
    id: number;
    name: string;
    email: string;
    avatar: string;
    idVendor: number;
}
/* ENTITIES ----------- */

/*ok*/ export interface CenterProps {
    id: number;
    name: string;
    languageCode: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

/*ok*/ export interface PurchaseGroupProps {
    id: number;
    name: string;
    description: string;
    phone: string;
    mail: string;
}

/*ok*/ export interface PurchaseOrganizationProps {
    id: number;
    name: string;
    notes?: string;
    vendors?: VendorProps[];
    center?: CenterProps;
    groups?: PurchaseGroupProps;
}

/*ok*/ export interface PaymentProps {
    id: number;
    country: string;
    bankKey: string;
    agency: string;
    account: string;
    accountType: string;
    accountHolder: string;
}

/*ok*/ export interface VendorProps {
    id: number;
    code: string; // F-A098
    accountGroup: AccountGroup | string;
    searchTerm: string; // código de 4 digitos pra pesquisar facil
    name: string;
    phone: string;
    email: string;
    address: string;
    payments: PaymentProps[];
    representative: RepresentativeProps;
    stdDeliveryTime: string;
    stdQty: number;
    minimumQty: number;
}

/*ok*/ export interface ProductProps {
    id: number;
    code: string;
    material?: string;
    description?: string;
    materialGroup?: string;
    qtyRequested?: number;
    deliveryEstimation?: string;
    requestDate?: string | Date;
    releaseDate?: string | Date;
    valuationPrice?: number | string;
    status?: string;
    createdBy?: string;
    modifiedBy?: string;
    notes?: string;
}

/* ORDERS ----------- 
  a requisição de compra está diretamente ligada à organização de compras, 
  que tem seus grupos de compras e seus fornecedores.
  os produtos são independentes e todos os fornecedores vendem eles
*/
/*ok*/ export interface PurchaseRequisitionProps {
    id: number;
    trackerNumber: number;
    notes: string;
    type?: OrderType | string;
    requisitionGoal?: string;
    deliveryPlace?: DeliveryPlace | string;
    requestedBy?: string;
    purchaseOrganization?: PurchaseOrganizationProps;
    purchaseCenter?: string;
    status?: OrderStatus | string;
    productList?: ProductProps[];
    isApproved?: boolean;
    seniorComment?: string;
    subtotal?: number | string;
    submittedToSenniorAt: Date | number;
    openenedAt: string | Date;
    refreshList?: boolean;
}

export interface RequestForQuotationProps {
    purchaseRequisition: PurchaseRequisitionProps | null; // extrair org. de compras
    type: 'AB' | 'AN';
    requestDate: string | Date;
    RFQColet: string; // tracker da cotação
    reference: {
        name: string;
        number: number;
        phone: string;
    };
}

// mesma purchase, outro produto
export interface RFQVersionsProps {
    purchaseRequisition: PurchaseRequisitionProps; // extrair org. de compras
    id: number;
    RFQColet: string;
    RFQData: RequestForQuotationProps;
}

//nos Tickets, criar menu com as versões do RFQ, cada um com seu respectivo ticket,
// mensagens e anexos
