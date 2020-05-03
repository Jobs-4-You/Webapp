import axios from 'axios';

export function parseServerError(msg) {
  const re = /CODE\(([0-9]*)\)\sMSG\((.*)\)/g;
  const match = re.exec(msg);
  if (match) {
    return { code: Number(match[1]), errorMsg: match[2] };
  }
  return { code: null, errorMsg: null };
}

export function getCertificate(me, jobTitle) {
  console.log(me);
  const { civilite, firstName, lastName, birthDate } = me;
  axios({
    url: `${process.env.API_URI}/certificate`,
    method: 'POST',
    responseType: 'blob', // important
    data: {
      civilite,
      firstName,
      lastName,
      birthDate,
      jobTitle,
    },
  })
    .then(function (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'certificate.pdf');
      document.body.appendChild(link);
      link.click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
