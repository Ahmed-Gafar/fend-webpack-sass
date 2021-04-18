import { isUrl } from "./verifier";


async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  if (!isUrl(formText)) {
    alert("please enter url format");
    return;
  }
  try {
    let response = await fetch("/api_response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: formText }),
    });
    const body = await response.json();

    if (body.status.msg == "OK") {
      let data = formatData(body);

      let tbl = tableCreate(data);
      let divInfo = addInfo(body);

      let tableElement = document.getElementById("results");
      let infoElement = document.getElementById("info");
      if (
        document.getElementById("table") != null ||
        document.getElementById("infoDiv") != null
      ) {
        tableElement.removeChild(document.getElementById("table"));
        infoElement.removeChild(document.getElementById("infoDiv"));
      }
      tableElement.appendChild(tbl);
      infoElement.appendChild(divInfo);
    }
  } catch (error) {
    alert("there was an error from the server side");
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

function addInfo(body) {
  let subjectivity = body.subjectivity.toLowerCase();
  let text = `this article's subjectivity is ${subjectivity} and its sentiment is `;
  switch (body.score_tag) {
    case "P+":
      text += "strong positive";
      break;
    case "P":
      text += "positive";
      break;
    case "NEU":
      text += "neutral";
      break;
    case "N":
      text += "negative";
      break;
    case "N+":
      text += "strong negative";
      break;
    default:
      text += "without sentiment";
  }

  let newDiv = document.createElement("div");
  newDiv.id = "infoDiv";
  const newContent = document.createTextNode(text);
  newDiv.appendChild(newContent);
  return newDiv;
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
