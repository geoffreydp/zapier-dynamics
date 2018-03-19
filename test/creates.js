require('should');
const zapier = require('zapier-platform-core');
const xml_result = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'+
            '<s:Body><RegistrarProspectoResponse xmlns="http://tempuri.org/">' +
            '<RegistrarProspectoResult>&lt;ParametrosOutput&gt;&lt;Respuesta&gt;' +
            '&lt;IndicadorExito&gt;S&lt;/IndicadorExito&gt;&lt;DescripcionError&gt;' +
            '&lt;/DescripcionError&gt;&lt;/Respuesta&gt;&lt;/ParametrosOutput&gt;' +
            '</RegistrarProspectoResult></RegistrarProspectoResponse></s:Body></s:Envelope>';

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('creates', () => {

  describe('create prospect create', () => {
    it('should create a new prospect', (done) => {
      const bundle = {
        inputData: {
          primernombre: 'Jhon',
          apellidopaterno: 'Doe',
          telefonomovil: '987354656',
          email: 'jhon@doe.com',
          fuenteorigin: '101'
        }
      };
/*      describe('create recipe create', () => {
        it('should create a new recipe', (done) => {
          const bundle = {
            inputData: {
              name: 'Smith Family Recipe',
              directions: '1. Order out :)',
              authorId: 1
            }
          };*/

      appTester(App.creates.prospect.operation.perform, bundle)
      /*  .then((result) => {
          result.should.have.property();
          done();
        }) */
        .then((result) => {
          //response.xml = xml.parse(result.content);
          result.should.eql(xml_result);
          done();
        })
        .catch(done);
    });
  });
});
