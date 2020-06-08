console.log('Client side script')



// const btn = document.getElementById('btn');
const form = document.querySelector('form')

form.addEventListener('submit' , (e) => {
    // console.log('submited')
    e.preventDefault();
    
    const address = document.getElementById('address').value;
    const msg1 = document.getElementById('msg1');
    const msg2 = document.getElementById('msg2');
    
    msg1.textContent = 'Loading'
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?address='+address).then( (response) => {
    response.json().then( (data) => {
        if(data.error){
            msg1.textContent = data.error;
        }else{
            msg1.textContent = 'Temp: '+data.temp;
            msg2.textContent = 'Location: '+data.address;
        }
    })
})
})

// console.log('test')