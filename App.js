// Import do framework Express

const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  //testes para verificar se a nota está funcionado
  let i = 0;
  if ((i == 0)) {
    res.status(200).send("App Funcionado").end();
  } else {
    res.status(404).end("Erro");
  }
});

const cursos = ["React Native", "javaScript", "ReactJS"];
// retona todos os cursos no array
app.get("/cursos", (req, res) => {
  return res.json(cursos);
});

//retorna o curso selecionado pelo index
app.get("/cursos/:index", (req, res) => {
  const { index } = req.params;
//   console.log("Chegou aqui");

  return res.json(cursos[index]);
});

//create - cria um novo curso
app.post("/cursos", (req, res) => {
    const { nome } = req.body;
    cursos.push(nome);
    return res.json(cursos);
})

//update - atualizado um curso
app.put("/cursos/:index", (req, res) => {
    const { index } = req.params;
    const { nome } = req.body

    cursos[index] = nome;

    return res.json(cursos);
})

//exclido um curso
app.delete("/cursos/:index", (req, res) => {
    const { index } = req.params;

    const cursoDeletado = cursos[index];
    cursos.splice(index, 1);
    return res.json({ message: `Curso de ${cursoDeletado} excluido com sucesso`});

    // naão envia nenhuma mensagem
    // return res.send()
})


// esse codigo fica no fim da pagina
app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
