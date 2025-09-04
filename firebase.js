// Configuración y lógica de Firebase para Residencial Los Robles

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA2pqsyV3NUAYpsatf_psbxGQzjgaGme-w",
    authDomain: "residencial-los-robles.firebaseapp.com",
    projectId: "residencial-los-robles",
    storageBucket: "residencial-los-robles.firebasestorage.app",
    messagingSenderId: "259244004877",
    appId: "1:259244004877:web:374055445e86b61028a744",
    measurementId: "G-C8G2ME6B09"
};

// Inicializar Firebase
let db;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    document.getElementById('status').textContent = 'Conectado a Firebase correctamente';
    document.getElementById('status').className = 'status connected';
} catch (error) {
    console.error("Error inicializando Firebase:", error);
    document.getElementById('status').textContent = 'Error conectando a Firebase: ' + error.message;
}


document.getElementById('btnAgregar').addEventListener('click', async function() {
    const nombre = document.getElementById('nombre').value;
    const apartamento = document.getElementById('apartamento').value;
    const telefono = document.getElementById('telefono').value;
    const estado = document.getElementById('estado').value;

    if (!nombre || !apartamento) {
        alert('Por favor, complete al menos el nombre y el apartamento.');
        return;
    }

    try {
        
        await db.collection("residentes").add({
            nombre: nombre,
            apartamento: apartamento,
            telefono: telefono,
            estado: estado,
            fechaRegistro: new Date()
        });
        
        alert('Residente agregado correctamente!');
        
       
        document.getElementById('nombre').value = '';
        document.getElementById('apartamento').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('estado').value = 'al día';
        
    } catch (error) {
        console.error("Error agregando documento: ", error);
        alert('Error al agregar residente: ' + error.message);
    }
});


document.getElementById('btnCargar').addEventListener('click', async function() {
    try {
        const residentesList = document.getElementById('residentesList');
        residentesList.innerHTML = '<p style="text-align: center; padding: 20px; color: #888;">Cargando datos...</p>';
        
        
        const querySnapshot = await db.collection("residentes").get();
        
        if (querySnapshot.empty) {
            residentesList.innerHTML = '<p style="text-align: center; padding: 20px; color: #888;">No hay residentes registrados.</p>';
            return;
        }
        
        residentesList.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const residenteDiv = document.createElement('div');
            residenteDiv.className = 'data-item';
            
            
            let fechaFormateada = 'No especificada';
            if (data.fechaRegistro) {
                const fecha = data.fechaRegistro.toDate();
                fechaFormateada = fecha.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            }
            
            residenteDiv.innerHTML = `
                <h3>${data.nombre}</h3>
                <p><strong>Apartamento:</strong> ${data.apartamento}</p>
                <p><strong>Teléfono:</strong> ${data.telefono || 'No proporcionado'}</p>
                <p><strong>Estado:</strong> ${data.estado}</p>
                <p><strong>Fecha registro:</strong> ${fechaFormateada}</p>
                <div class="actions">
                    <button class="btn-delete" onclick="eliminarResidente('${doc.id}')">Eliminar</button>
                </div>
            `;
            residentesList.appendChild(residenteDiv);
        });
        
    } catch (error) {
        console.error("Error cargando documentos: ", error);
        document.getElementById('residentesList').innerHTML = '<p style="text-align: center; padding: 20px; color: #EA4335;">Error cargando datos: ' + error.message + '</p>';
    }
});


window.eliminarResidente = async function(id) {
    if (confirm('¿Está seguro de que desea eliminar este residente?')) {
        try {
            await db.collection("residentes").doc(id).delete();
            alert('Residente eliminado correctamente!');
            
            document.getElementById('btnCargar').click();
        } catch (error) {
            console.error("Error eliminando documento: ", error);
            alert('Error al eliminar residente: ' + error.message);
        }
    }
};


document.addEventListener('DOMContentLoaded', function() {
    
    setTimeout(() => {
        if (db) {
            document.getElementById('btnCargar').click();
        }
    }, 1000);
});
