function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    const formdata = new FormData();
    formdata.append("key", "092f8720ac43ccc25d2ea1e9b645beb3");
    formdata.append("txt", formText);
    formdata.append("lang", "en");  // 2-letter code, like en es fr ...

    const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    let getData = async () => {
        const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        const data = await response.json()
        console.log(data)
        return data
    }
    
    let data = getData()

    data = [['this is test', 'eqvgjhwbkjn fejfnkfrb kfe bckoufshofe hi fi we  ew dhrf  bd  er hewes  fr ew f gre d  tr rf ']]
    var tbl = tableCreate(data);

    var myElement = document.getElementById("results").appendChild(tbl);
    console.log(myElement);


}

// function that takes as an input the name and label to create a table with it's size
function tableCreate(data){
    var tbl  = document.createElement('table');
    tbl.style.width  = '850px';
    tbl.id  = 'table';
    tbl.style.border = '1px solid black';

    var tr = tbl.insertRow();
    var td = tr.insertCell();
    td.appendChild(document.createTextNode('Word'));
    td.style.border = '2px solid black';
    td.style.fontWeight = 'bold';
    var td = tr.insertCell();
    td.appendChild(document.createTextNode('entity'));
    td.style.border = '2px solid black';
    td.style.fontWeight = 'bold';

    for(var i = 0; i < data.length ; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 2; j++){
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(data[i][j]));
            td.style.border = '1px solid black';
        }
    }
    return tbl
}

export { handleSubmit }
