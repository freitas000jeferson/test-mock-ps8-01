const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { port, version, clientURL } = require('../config/env');

module.exports = {
    get: catchAsync(async (req, res) =>
        res.status(StatusCodes.OK).json(
            {
                "apiVersion": "1",
                "transactionId": "d6f30fac-8abb-42ba-b91b-a0e97cd20289",
                "data": {
                    "subscribers": [
                        {
                            "name": "JOAO DA SILVA ",
                            "serviceType": "MOVEL",
                            "type": "CLARO_CARTAO",
                            "effectiveSinceDate": "2025-06-17T00:00:00.000-03:00",
                            "wppStatus": "ATIVO",
                            "productStatus": "PRE_ATIVO",
                            "productStatusDate": "2025-06-17T11:43:22.000-03:00",
                            "wppReason": "PENDENTE_RECARGA",
                            "reason": "SOLICITACAO_CLIENTE",
                            "ticketAttendance": "NULL",
                            "customer": {
                                "personType": "PF",
                                "documents": {
                                    "cpf": "12300012345",
                                    "rg": "NULL"
                                },
                                "crmCustomerId": "1045775381918600178020837200432",
                                "name": "JOAO DA SILVA"
                            },
                            "msisdn": "11000000100",
                            "crmId": "1046020805580293733244537200437"
                        }
                    ]
                }

            }
        )
    ),
};
