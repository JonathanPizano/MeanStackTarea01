'use strict'
var express = require('express')
var bodyParser = require('body-parser')

 var app = express()

var port = process.env.PORT || 7070;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/api/:operando1?/:operacion?/:operando2?', function(req, res){
    
    var noParams = "No hay suficientes parametros para efectuar la operación"

    // Si no existe el segundo operando la operacion no se puede efectuar
    if(!req.params.operando2){
        res.status(200).send(noParams)    
    }else{

        var oper1 = parseFloat(req.params.operando1); 
        var oper2 = parseFloat(req.params.operando2);
        var operacion1 = req.params.operacion; 
        var resultado = 0;

        switch (operacion1){
            case "+":
                resultado += parseFloat(oper1 + oper2)
                operacion1 = "Suma"
                break;
            case "-":
                resultado += parseFloat(oper1 - oper2)
                operacion1 = "Resta"
                break;
            case "x"    :
                resultado += parseFloat(oper1 * oper2)
                operacion1 = "Multiplicacion"
                break;
            case "d":
                resultado += parseFloat(oper1 / oper2)
                operacion1 = "Division"
                break;
            default :
                resultado += parseFloat(oper1 + oper2)
                operacion1 = "Suma(default)"
                break            
        
        }
    // Se envia el resultado en forma de objeto json
    res.status(200).send({
        Dato1: oper1,
        Operacion: operacion1,
        Dato2: oper2,
        Resultado : resultado 
    })
}

});

app.listen(7070, function (){
    console.log('Servicio corriendo en puerto: ' + port)
});

