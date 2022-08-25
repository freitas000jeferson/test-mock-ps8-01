class DocumentsScanning {
  constructor(data) {
    this.data = data.data;
    this.attachments = data.attachments;
    this.fieldPhoneNumber = data.data.find(
      (element) => element.field === 'MSISDN'
    );
    this.fieldDocumentNumber = data.data.find(
      (element) => element.field === 'Número do CPF'
    );
  }

  toJson() {
    return {
      phoneNumber: this.fieldPhoneNumber.value,
      documentNumber: this.fieldDocumentNumber.value,
      data: this.data,
      attachments: this.attachments.map((att) => att.type),
    };
  }
}
module.exports = DocumentsScanning;

/**
const aux = {
  codLogin: 'rma.clr.prepago.integrador',
  desSenha: 'mXnJik01',
  indexadoresAdicionais: [
    {
      campo: 'Número do CPF',
      valor: '37045803842',
    },
    {
      campo: 'Canal de Venda',
      valor: 'SITE',
    },
    {
      campo: 'MSISDN',
      valor: '11999999999',
    },
  ],
  arquivos: [
    {
      arquivo: '{{rg_base64_ab_brscan}}',
      tipo: 'RG',
    },
    {
      arquivo: '{{selfie_base64_brscan}}',
      tipo: 'Foto',
    },
  ],
};
 */
