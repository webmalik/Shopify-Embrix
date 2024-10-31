// // Retrieves input data from a form and returns it as a JSON object:
// function formToJSON(elements) {
//     return [].reduce.call(
//         elements,
//         function (data, element) {
//             data[element.name] = element.value;
//             return data;
//         },
//         {},
//     );
// }

// // Get Shopify Friendly URL String
// function getUrlString(data) {
//     var urlParameters = Object.entries(data)
//         .map(function (e) {
//             return e.join('=');
//         })
//         .join('&');

//     return urlParameters;
// }

// function getUrlParameter(sParam) {
//     var sPageURL = decodeURIComponent(window.location.search.substring(1)),
//         sURLVariables = sPageURL.split('&'),
//         sParameterName,
//         i;

//     for (i = 0; i < sURLVariables.length; i++) {
//         sParameterName = sURLVariables[i].split('=');

//         if (sParameterName[0] === sParam) {
//             return sParameterName[1] === undefined ? true : sParameterName[1];
//         }
//     }
// }

// function ajaxFormInit(form) {
//     var form_type = form.querySelector('[name=form_type]').value,
//         inputs = form.querySelectorAll('[name]'),
//         alert = form.querySelector('[data-alert="status"]'),
//         alert_msgs = form.querySelector('.form-alerts');

//     form.addEventListener('submit', function (e) {
//         e.preventDefault();

//         var action = form.getAttribute('action');

//         if (alert_msgs) {
//             var alert_msg = JSON.parse(alert_msgs.innerHTML);
//         }

//         console.log('Form Action: ' + action);
//         console.log('Submitting ' + form_type + ' form...');

//         fetch(action, {
//             method: 'POST',
//             body: getUrlString(formToJSON(inputs)),
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//                 Accept: 'text/html, */*; q=0.01',
//                 'X-Requested-With': 'XMLHttpRequest',
//             },
//         })
//             .then(function (response) {
//                 console.log(response);
//                 console.log(response.status);

//                 if (alert) {
//                     alert.className = 'alert alert-success';
//                     alert.innerHTML = alert_msg.success;
//                 }

//                 var checkoutUrl = getUrlParameter('checkout_url');

//                 if (checkoutUrl) {
//                     window.location = getUrlParameter('checkout_url');
//                 } else if (response.status === 200 && form_type !== 'contact') {
//                     window.location.pathname = '/account';
//                 }
//             })
//             .catch(function (err) {
//                 console.error(err);

//                 if (alert) {
//                     alert.className = 'alert alert-error';
//                     alert.innerHTML = alert_msg.error;
//                 }
//             });
//     });
// }

// // Init Shopify Forms
// document.querySelectorAll('[name=form_type]').forEach(function (el) {
//     ajaxFormInit(el.closest('form'));
// });
