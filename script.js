<script>
    const form = document.getElementById('form');
    const result = document.getElementById('result');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const mainMessage = document.getElementById('message').value;
      const additionalMessage =
        document.getElementById('additionalMessage').value;

      const fullMessage = additionalMessage
        ? `${mainMessage}, ${additionalMessage}`
        : mainMessage;

      const formData = new FormData(form);
      formData.set('message', fullMessage);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
      console.log('formData', object);
      result.innerHTML = 'Please wait...';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            result.innerHTML = json.message;
          } else {
            console.log(response);
            result.innerHTML = json.message;
          }
        })
        .catch((error) => {
          console.log(error);
          result.innerHTML = 'Something went wrong!';
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            result.style.display = 'none';
          }, 3000);
        });
    });
  </script>