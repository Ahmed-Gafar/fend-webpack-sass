async function handleSubmit(event) {
  event.preventDefault();

  // let api_key_response = await fetch("http://localhost:8081/api_key");
  // let api_key = await api_key_response.json();

  let api_key = process.env.API_KEY;
  console.log(process.env.API_KEY)

  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  const formdata = new FormData();
  formdata.append("key", api_key);
  formdata.append("txt", formText);
  formdata.append("lang", "en"); // 2-letter code, like en es fr ...

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(
    "https://api.meaningcloud.com/sentiment-2.1",
    requestOptions
  );
  const body = await response.json();

  if (body.status.msg == "OK") {
    let data = formatData(body);
    let tbl = tableCreate(data);

    let myElement = document.getElementById("results");
    if (document.getElementById("table") != null)
      myElement.removeChild(document.getElementById("table"));
    myElement.appendChild(tbl);
  }
}

function formatData(body) {
  let result = [];
  for (let i = 0; i < body.sentimented_concept_list.length; i++) {
    let name = body.sentimented_concept_list[i].form;
    let label = body.sentimented_concept_list[i].type;
    result.push([name, label]);
  }
  for (let i = 0; i < body.sentimented_entity_list.length; i++) {
    let name = body.sentimented_entity_list[i].form;
    let label = body.sentimented_entity_list[i].type;
    result.push([name, label]);
  }
  return result;
}

// function that takes as an input array of names and labels to create a table with it's size
function tableCreate(data) {
  var tbl = document.createElement("table");
  tbl.style.width = "850px";
  tbl.id = "table";
  tbl.style.border = "1px solid black";

  var tr = tbl.insertRow();
  var td = tr.insertCell();
  td.appendChild(document.createTextNode("Word"));
  td.style.border = "2px solid black";
  td.style.fontWeight = "bold";
  var td = tr.insertCell();
  td.appendChild(document.createTextNode("entity"));
  td.style.border = "2px solid black";
  td.style.fontWeight = "bold";

  for (var i = 0; i < data.length; i++) {
    var tr = tbl.insertRow();
    for (var j = 0; j < 2; j++) {
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(data[i][j]));
      td.style.border = "1px solid black";
    }
  }
  return tbl;
}

export { handleSubmit };
