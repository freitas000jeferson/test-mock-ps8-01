const router = require('express').Router();
const express = require('express');
const {
  mobilesubscribers,
  tokens,
  scanning,
  customers,
} = require('../controllers');
const { validate } = require('../middlewares');
const AcessToken = require('../services/accessToken/index');

const {
  validationSchemas: { general },
} = require('../validations');

// PS8
router.get(
  '/mobile/v1/customers/details',
  validate(general.get),
  customers.get
);
router.post(
  '/mobile/v1/customers/subscriptions/notifications',
  customers.updateStatus
);

// SMS =>{rtdmStatus:"SUCCESS"}
router.post('/communication/v1/messages', async (req, res) => {
  const data = {
    data: {
      rtdmStatus: 'RTDM00',
    },
  };
  res.send(data);
});

// Apigee auth => Y2FkcHJldjI6ZmFrZS10b2tlbg==
router.post(
  '/oauth2/v1/token',
  express.urlencoded({ extended: true }),
  async (req, res) => {
    const data = {
      refresh_token_expires_in: '0',
      api_product_list:
        '[gerenciamento-senhas-otp-test, digital-bemobi-tokens, cadastro-cliente-movel-test, pacotes-adicionais-movel-test, bloqueio-aparelho-mobile-test, geracao-protocolo-atendimento-test, digital-customers-offers-bemobi, movel-assinante-test, domains-mobilesubscribers-test, stwsso-otp-canais-test, analise-antifraude-documentocopia-test, cliente-analise-risco-test, communication-messages-test, promocoes-assinantes-test, now-online-cases-test, cadastro-pre-pago-movel-test, mobile-customers-interactions-test, historico-promocoes-movel-test, consulta-saldo-test, registro-respostas-questionario-cadastral-test, movel-endereco-test, mobile-simcards-test]',
      api_product_list_json: [
        'gerenciamento-senhas-otp-test',
        'digital-bemobi-tokens',
        'cadastro-cliente-movel-test',
        'pacotes-adicionais-movel-test',
        'bloqueio-aparelho-mobile-test',
        'geracao-protocolo-atendimento-test',
        'digital-customers-offers-bemobi',
        'movel-assinante-test',
        'domains-mobilesubscribers-test',
        'stwsso-otp-canais-test',
        'analise-antifraude-documentocopia-test',
        'cliente-analise-risco-test',
        'communication-messages-test',
        'promocoes-assinantes-test',
        'now-online-cases-test',
        'cadastro-pre-pago-movel-test',
        'mobile-customers-interactions-test',
        'historico-promocoes-movel-test',
        'consulta-saldo-test',
        'registro-respostas-questionario-cadastral-test',
        'movel-endereco-test',
        'mobile-simcards-test',
      ],
      organization_name: 'clarobrasilx-nonprod',
      'developer.email': 'squad_digital_prepago@globalhitss.com.br',
      token_type: 'Bearer',
      issued_at: '1781799534804',
      client_id: 'IyPOlmn2TqUEvWqUZGiIuL7BIPFjPD8t',
      access_token: 's2BiPKZoeLwrGUAC0DOpi5UHI1w4',
      application_name: '9304e395-a95b-471d-9479-292206f4fd1a',
      scope: '',
      expires_in: '86399',
      refresh_count: '0',
      status: 'approved',
    };
    return res.send(data);
  }
);

// Protocolo => x1234567890
router.post('/domains/v1/interactions', async (req, res) => {
  const data = {
    apiVersion: '1; 2020-06-11',
    transactionId: 'e6e4e0f4-089d-4194-845e-78f45426f7c7',
    data: {
      protocolNumber: '1234567890',
    },
  };
  res.send(data);
});

// Token => header{x-otpsessionid: '123456' } body{ data: { otptoken: '123' }}
router.get('/domains/v1/otptokens', tokens.generate);
router.post('/domains/v1/otptokens', tokens.validate);

// Endereço - #TODO
router.get('/domains/v1/address', validate(general.get), mobilesubscribers.get);

// Documentoscopia
router.post(
  '/document/v1/documentoscopyanalysis',
  validate(general.createScanning),
  scanning.save
);
router.get('/hc', (req, res) => {
  const data = {
    date: new Date().toISOString(),
    version: 'v2',
    success: true,
  };
  res.send(data);
});

module.exports.mock = router;

/**
 https://mock-ps8-01.vercel.app/api/v1/appv2
 *  */
