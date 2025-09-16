const nodeDetails = {
    central: {
        title: "Diseño Universal para el Aprendizaje (DUA)",
        description:
            "Marco pedagógico que anticipa la diversidad desde el inicio, eliminando barreras y generando trayectorias flexibles para todo el alumnado.",
        bullets: [
            "Propone opciones múltiples en objetivos, métodos, materiales y evaluación para responder a estilos y ritmos de aprendizaje diversos.",
            "Reconoce que todas las personas pueden aprender si se minimizan barreras físicas, sensoriales, cognitivas y culturales.",
        ],
    },
    principios: {
        title: "Principios flexibles del DUA",
        description:
            "Orientan la planificación de experiencias accesibles a través de tres grandes vías que se pueden combinar entre sí.",
        bullets: [
            "Compromiso: motivar, sostener el interés y ofrecer autonomía graduada en la participación estudiantil.",
            "Representación: presentar los contenidos con múltiples formatos, lenguajes y apoyos para facilitar la comprensión.",
            "Acción y expresión: habilitar diferentes formas de interacción y de demostrar lo aprendido, con apoyos y andamiajes.",
        ],
    },
    redes: {
        title: "Bases neurocientíficas",
        description:
            "El DUA se fundamenta en el funcionamiento de las redes de reconocimiento, estratégicas y afectivas del cerebro.",
        bullets: [
            "Red de reconocimiento: cómo percibimos la información, requiere variedad sensorial y claridad semántica.",
            "Red estratégica: planifica y ejecuta acciones; necesita andamiajes, modelado y oportunidades de práctica.",
            "Red afectiva: regula motivación y emociones; se potencia con propósito, relevancia y retroalimentación positiva.",
        ],
    },
    estrategias: {
        title: "Estrategias didácticas inclusivas",
        description:
            "El mapa invita a combinar estrategias activas y colaborativas que mantengan altas expectativas para todos los estudiantes.",
        bullets: [
            "Proporcionar guías visuales, anticipadores, bancos de recursos y ejemplos graduados.",
            "Ofrecer opciones de trabajo individual, cooperativo y proyectos con elección auténtica.",
            "Incorporar apoyos como organizadores gráficos, checklists y rúbricas comprensibles.",
        ],
    },
    planificacion: {
        title: "Planificación docente flexible",
        description:
            "Implica diseñar desde el inicio actividades, materiales y tiempos que contemplen variabilidad y apoyos escalonados.",
        bullets: [
            "Definir metas claras y retadoras que permitan diversas rutas de acceso y demostración.",
            "Identificar barreras potenciales y prever alternativas de acceso, colaboración y expresión.",
            "Documentar la secuencia didáctica en formatos abiertos que puedan adaptarse en tiempo real.",
        ],
    },
    tecnologia: {
        title: "Recursos y tecnología",
        description:
            "Las herramientas digitales, analógicas y de apoyo sensorial amplían las posibilidades de participación equitativa.",
        bullets: [
            "Seleccionar herramientas accesibles (lectores de pantalla, subtítulos, transcriptores, pictogramas, etc.).",
            "Combinar recursos multimedia con materiales manipulables y experiencias concretas.",
            "Fomentar la creación de contenidos por parte del estudiantado utilizando plantillas y formatos accesibles.",
        ],
    },
    evaluacion: {
        title: "Evaluación inclusiva y formativa",
        description:
            "La evaluación en clave DUA es continua, diversa y orientada a la mejora, evitando decisiones únicas y excluyentes.",
        bullets: [
            "Usar rúbricas, portfolios, registros de observación y autoevaluaciones que contemplen diferentes evidencias.",
            "Acordar criterios visibles y comprensibles, con retroalimentación frecuente y orientada al proceso.",
            "Permitir múltiples formas de demostrar logros: producciones orales, visuales, digitales, dramatizaciones, etc.",
        ],
    },
    beneficios: {
        title: "Impacto en el aula",
        description:
            "Implementar el DUA transforma la cultura escolar hacia la equidad y el aprendizaje profundo para todas las personas.",
        bullets: [
            "Disminuye la segregación y promueve la pertenencia, fortaleciendo el clima institucional.",
            "Aumenta la participación y el protagonismo estudiantil al brindar apoyos graduados y autonomía.",
            "Fortalece el trabajo colaborativo docente y la mirada interdisciplinar sobre la enseñanza.",
        ],
    },
};

const mapWrapper = document.querySelector(".map-wrapper");
const connectionsSvg = document.querySelector(".connections");
const nodes = Array.from(document.querySelectorAll(".node"));
const centralNode = document.querySelector(".node-central");
const infoTitle = document.querySelector(".info-title");
const infoSummary = document.querySelector(".info-summary");
const infoList = document.querySelector(".info-list");

function renderInfo(nodeId) {
    const data = nodeDetails[nodeId] ?? nodeDetails.central;
    infoTitle.textContent = data.title;
    infoSummary.textContent = data.description;

    infoList.innerHTML = "";
    data.bullets.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        infoList.appendChild(li);
    });
}

function setActiveNode(selectedNode) {
    nodes.forEach((node) => {
        const isActive = node === selectedNode;
        node.setAttribute("aria-pressed", isActive ? "true" : "false");
        if (!node.classList.contains("node-central")) {
            node.classList.toggle("node--active", isActive);
        }
    });
}

function updateConnections() {
    if (!connectionsSvg || !mapWrapper) return;

    const isHidden = window.getComputedStyle(connectionsSvg).display === "none";
    connectionsSvg.innerHTML = "";

    if (isHidden) {
        return;
    }

    const wrapperRect = mapWrapper.getBoundingClientRect();
    const centralRect = centralNode.getBoundingClientRect();
    const centralPoint = {
        x: centralRect.left - wrapperRect.left + centralRect.width / 2,
        y: centralRect.top - wrapperRect.top + centralRect.height / 2,
    };

    connectionsSvg.setAttribute("viewBox", `0 0 ${wrapperRect.width} ${wrapperRect.height}`);
    connectionsSvg.setAttribute("width", wrapperRect.width);
    connectionsSvg.setAttribute("height", wrapperRect.height);

    nodes.forEach((node) => {
        if (node === centralNode) return;

        const rect = node.getBoundingClientRect();
        const nodePoint = {
            x: rect.left - wrapperRect.left + rect.width / 2,
            y: rect.top - wrapperRect.top + rect.height / 2,
        };

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", centralPoint.x);
        line.setAttribute("y1", centralPoint.y);
        line.setAttribute("x2", nodePoint.x);
        line.setAttribute("y2", nodePoint.y);
        line.setAttribute("stroke-linecap", "round");
        line.classList.add("connection-line");
        connectionsSvg.appendChild(line);
    });
}

function handleNodeClick(event) {
    const node = event.currentTarget;
    const nodeId = node.dataset.node;
    renderInfo(nodeId);
    setActiveNode(node);
}

nodes.forEach((node) => {
    node.addEventListener("click", handleNodeClick);
});

renderInfo("central");
setActiveNode(centralNode);
updateConnections();

window.addEventListener("resize", () => {
    window.requestAnimationFrame(updateConnections);
});

window.addEventListener("orientationchange", () => {
    window.requestAnimationFrame(updateConnections);
});

window.addEventListener("load", () => {
    updateConnections();
});

setTimeout(updateConnections, 250);
