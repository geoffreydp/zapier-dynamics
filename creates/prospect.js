var XML = require('pixl-xml');
// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'prospect',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Prospect',
  display: {
    label: 'Create Prospect',
    description: 'Creates a new prospect.'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      {key: 'primernombre', required: false, type: 'string'},
      {key: 'apellidopaterno', required: false, type: 'string'},
      {key: 'telefonomovil', required: false, type: 'integer'},
      {key: 'email', required: false, type: 'string'},
      {key: 'fuenteorigin', required: false, type: 'string'},
    ],
    perform: (z, bundle) => {
      const xml_string = "<s11:Envelope xmlns:s11='http://schemas.xmlsoap.org/soap/envelope/'>" +
            "<s11:Body><ns1:RegistrarProspecto xmlns:ns1='http://tempuri.org/'>" +
            '<ns1:PrimerNombre>' + bundle.inputData.primernombre + '</ns1:PrimerNombre>' +
            '<ns1:ApellidoPaterno>' + bundle.inputData.apellidopaterno + '</ns1:ApellidoPaterno>' +
            '<ns1:TelefonoMovil>' + bundle.inputData.telefonomovil + '</ns1:TelefonoMovil>' +
            '<ns1:Email>' + bundle.inputData.email + '</ns1:Email>' +
            '<ns1:FuenteOrigen>101</ns1:FuenteOrigen>' +
            '</ns1:RegistrarProspecto>' +
            '</s11:Body>' +
            '</s11:Envelope>';
      const promise = z.request({
        timeout: 10000,
        url: 'http://1to1xpresseducaleadcreate.azurewebsites.net/Crm.svc',
        method: 'POST',
        body: xml_string,
        /*
        body: JSON.stringify({
          name: bundle.inputData.name,
          directions: bundle.inputData.directions,
          authorId: bundle.inputData.authorId,
          style: bundle.inputData.style,
        }),*/
        headers: {
          'content-type': 'text/xml',

          // This is NOT how you normally do authentication. This is just to demo how to write a create here.
          // Refer to this doc to set up authentication:
          // https://zapier.github.io/zapier-platform-cli/#authentication
          'soapAction': 'http://tempuri.org/ICrm/RegistrarProspecto'
        }
      });

      return promise.then((response) => XML.parse(response.content));
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      primernombre: 'Jose',
      apellidopaterno: 'Moltobene',
      telefonomovil: '999888777',
      email: 'j.moltobene@gmail.com',
      fuenteorigin: '101'
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: 'primernombre', label: 'Primer Nombre'},
      {key: 'apellidopaterno', label: 'Apellido Paterno'},
      {key: 'telefonomovil', label: 'Telefono Movil'},
      {key: 'email', label: 'Email'},
      {key: 'fuenteorigin', label: 'Fuente Origin'}
    ]
  }
};
