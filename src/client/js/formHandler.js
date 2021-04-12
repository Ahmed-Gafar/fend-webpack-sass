function handleSubmit(event) {
    event.preventDefault()

    let data = [['this is test', 'eqvgjhwbkjn fejfnkfrb kfe bckoufshofe hi fi we  ew dhrf  bd  er hewes  fr ew f gre d  tr rf ']]
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
