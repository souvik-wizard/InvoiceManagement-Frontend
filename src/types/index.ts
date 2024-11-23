
export interface invoiceData {

    phoneNumber: number;
    serialNumber: number;
    customerName: string;
    productName: string;
    tax: number;
    totalAmount: number;
    date: string;
    quantity: number;
    unitPrice: number;
    priceWithTax: number;
    totalPurchaseAmount: number;
    
  }

export interface FileState {
    uploadedFiles: File[];
    error: string | null;
  }