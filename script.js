class FigurasGeometricas {
    constructor() {
        this.tipo = "";
    }

    calcularArea() {
        return 0;
    }

    calcularPerimetro() {
        return 0;
    }
}

class Rectangulo extends FigurasGeometricas {
    constructor(base, altura) {
        super();
        this.tipo="Rectangulo";
        this.base = base;
        this.altura=altura;
    }

    calcularArea(){
        return this.base*this.altura;
    }

    calcularPerimetro(){
        return (2*this.base) + (2*this.altura);
    }
}

class Cuadrado extends FigurasGeometricas {
    constructor(lado){
        super();
        this.tipo="Cuadrado";
        this.lado=lado;
    }

    calcularArea(){
        return this.lado * this.lado;
    }

    calcularPerimetro(){
        return this.lado * 4;
    }
}

class Triangulo extends FigurasGeometricas {
    constructor(base, altura, lado1, lado2, lado3){
        super();
        this.tipo="Triangulo"
        this.base=base;
        this.altura=altura;
        this.lado1=lado1;
        this.lado2=lado2;
        this.lado3=lado3;
    }

    calcularAreaBA(){
        return(this.base*this.altura)/2;
    }

    calcularPerimetroBA(){
        const lado3 = Math.sqrt(this.base ** 2 + this.altura ** 2);
        return this.base + this.altura + lado3;
    }

    calcularAreaLados(){
        const s = (this.lado1 + this.lado2 + this.lado3)/2;
        return Math.sqrt(s*(s-this.lado1) * (s-this.lado2) * (s-this.lado3));
    }

    calcularPerimetroLados(){
        return this.lado1 + this.lado2 + this.lado3;
    }

}

class Circulo extends FigurasGeometricas {
    constructor(radio){
        super();
        this.tipo="Circulo";
        this.radio=radio;
    }

    calcularArea(){
        return Math.PI*(this.radio**2);
    }

    calcularPerimetro(){
        return (2*this.radio)*Math.PI;
    }
}

document.addEventListener("DOMContentLoaded",function(){
    const figuraSelect = document.getElementById("figura");
    const campoEntrada = document.getElementById("campoEntrada");
    const botonCalcular = document.getElementById("calcular");
    const resultado = document.getElementById("resultado");

    figuraSelect.addEventListener("change", mostrarCampos);

    botonCalcular.addEventListener("click", calcular);

    function mostrarCampos(){
        const figuraSeleccionada = figuraSelect.value;
        campoEntrada.innerHTML="";

        if (figuraSeleccionada === "rectangulo"){
            campoEntrada.innerHTML= `
            <label for="base">Base:</label>
            <input type="number" id="base" step="any">
            <label for="altura">Altura:</label>
            <input type="number" id="altura" step="any">`;
        }else if(figuraSeleccionada==="circulo"){
            campoEntrada.innerHTML=`
            <label for="radio">Radio:</label>
            <input type="number" id="radio" step="any">`;
        }else if(figuraSeleccionada==="cuadrado"){
            campoEntrada.innerHTML=`
            <label for="lado">Lado:</label>
            <input type="number" id="lado" step="any">`;
        }else if(figuraSeleccionada==="triangulo"){
            campoEntrada.innerHTML=`
            <label for="opcion">Selecciona cómo quieres calcular</label>
            <select id="opcion">
                <option value="" disabled selected>Seleccionar</option>
                <option value="baseAltura">Base y altura</option>
                <option value="lados">Lados</option>
            </select>
            <div id="camposTriangulos"></div>`;

            const opcionSelectTriangulo=document.getElementById("opcion");
            opcionSelectTriangulo.addEventListener("change", mostrarCamposTriangulo);
        }
    }

    function mostrarCamposTriangulo(){
        const opcionSeleccionada=document.getElementById("opcion").value;
        const camposTrianguloDiv=document.getElementById("camposTriangulos");

        if(opcionSeleccionada==="baseAltura"){
            camposTrianguloDiv.innerHTML=`
            <label for="base">Base:</label>
            <input type="number" id="base" step="any">
            <label for="altura">Altura:</label>
            <input type="number" id="altura" step="any">`;
        }else if(opcionSeleccionada==="lados"){
            camposTrianguloDiv.innerHTML=`
            <label for="lado1">Lado 1:</label>
            <input type="number" id="lado1" step="any">
            <label for="lado2">Lado 2:</label>
            <input type="number" id="lado2" step="any">
            <label for="lado3">Lado 3:</label>
            <input type="number" id="lado3" step="any">`;
        }
    }


    function calcular(){
        const figuraSeleccionada=figuraSelect.value;

        let area = 0;
        let perimetro = 0;

        if(figuraSeleccionada==="rectangulo"){
            const base = parseFloat(document.getElementById("base").value);
            const altura = parseFloat(document.getElementById("altura").value);

            if(!isNaN(base)&& !isNaN(altura) && base >0 && altura >0){
                const rectangulo = new Rectangulo(base, altura);
                area = rectangulo.calcularArea();
                perimetro = rectangulo.calcularPerimetro();
            }else{
                alert("Por favor, ingrese valores válidos para la base y altura.");
            }
        }else if (figuraSeleccionada==="circulo"){
            const radio = parseFloat(document.getElementById("radio").value);

            if(!isNaN(radio)&&radio>0){
                const circulo = new Circulo(radio);
                area = circulo.calcularArea();
                perimetro = circulo.calcularPerimetro();
            }else{
                alert("Por favor, ingrese valores válidos para el radio.");
            }
        }else if(figuraSeleccionada==="cuadrado"){
            const lado = parseFloat(document.getElementById("lado").value);

            if(!isNaN(lado)&&lado>0){
                const cuadrado = new Cuadrado(lado);
                area = cuadrado.calcularArea();
                perimetro = cuadrado.calcularPerimetro();
            }else{
                alert("Por favor, ingrese valores válidos para el lado.");
            }
        }else if(figuraSeleccionada==="triangulo"){
            const opcionSeleccionada = document.getElementById("opcion").value;

            if(opcionSeleccionada==="baseAltura"){
                const base = parseFloat(document.getElementById("base").value);
                const altura = parseFloat(document.getElementById("altura").value);
                if(!isNaN(base)&&!isNaN(altura)&&base>0&&altura>0){
                    const triangulo = new Triangulo(base, altura);
                    area=triangulo.calcularAreaBA();
                    perimetro=triangulo.calcularPerimetroBA();
                }else{
                    alert("Por favor, ingrese valores válidos para base y altura.");
                }
            }else if(opcionSeleccionada==="lados"){
                const lado1 = parseFloat(document.getElementById("lado1").value);
                const lado2 = parseFloat(document.getElementById("lado2").value);
                const lado3 = parseFloat(document.getElementById("lado3").value);
                if(!isNaN(lado1)&&!isNaN(lado2)&&!isNaN(lado3)&&lado1>0&&lado2>0&&lado3>0){
                    const triangulo=new Triangulo(undefined, undefined, lado1, lado2, lado3);
                    area = triangulo.calcularAreaLados();
                    perimetro = triangulo.calcularPerimetroLados();
                }else
                {
                    alert("Por favor, ingrese valores válidos para los lados del triángulo.");
                }
            }
            
        }

        resultado.innerHTML=`El área del ${figuraSeleccionada} es de: ${area.toFixed(2)} cm
        y el perímetro es de: ${perimetro.toFixed(2)} cm.`;
    }
});