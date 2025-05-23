import React, { useEffect, useState } from 'react';
import '../../styles/chat.css';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Paper,
  CircularProgress,
} from '@mui/material';

// --- FUNCIÓN DE LIMPIEZA MEJORADA ---
function limpiarTextoRespuesta(texto) {
  let textoLimpio = texto;

  // 1. Eliminar asteriscos de formato (Markdown para negritas, cursivas).
  // Busca **texto** o *texto* y lo reemplaza solo por texto.
  textoLimpio = textoLimpio.replace(/\*\*(.*?)\*\*/g, '$1'); // Para negritas
  textoLimpio = textoLimpio.replace(/\*(.*?)\*/g, '$1');   // Para cursivas

  // 2. Eliminar saltos de línea y espacios múltiples, dejando solo un espacio.
  textoLimpio = textoLimpio.replace(/[\r\n]+/g, ' '); // Reemplaza uno o más saltos de línea por un espacio
  textoLimpio = textoLimpio.replace(/\s\s+/g, ' '); // Reemplaza múltiples espacios por uno solo

  // 3. Eliminar emojis (patrón Unicode).
  // La 'u' flag es para Unicode y 'g' para todas las ocurrencias.
  textoLimpio = textoLimpio.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{2328}\u{23EA}-\u{23EC}\u{2B05}\u{2B06}\u{2B07}\u{25AA}\u{25AB}\u{25FB}\u{25FC}\u{25FD}\u{25FE}\u{2B1B}\u{2B1C}\u{2B50}\u{2B55}]/gu, '');


  // 4. Limpiar espacios al inicio y al final.
  textoLimpio = textoLimpio.trim();

  return textoLimpio;
}
// --- FIN FUNCIÓN DE LIMPIEZA ---

const API_KEY = 'AIzaSyAjCfoERXorGMNWB-Xk375XAU56rbocmj8'; // ¡ATENCIÓN! Proteger tu API Key es crucial en un entorno de producción.
const BACKEND_URL = 'http://127.0.0.1:5000';

const KNOWLEDGE = `
🟢 Clientes:
¡Claro! Para crear o editar un cliente en Flash Food, solo sigue estos pasos:
1. Ve al panel de clientes desde el menú principal.
2. Haz clic en el botón "Agregar cliente" o selecciona uno existente para editar.
3. Ingresa: 🪪 Nombre, 📧 Correo, 📞 Teléfono, 📍 Dirección.
4. Revisa que todo esté bien escrito y haz clic en Guardar.

🟢 Pedidos:
1. Ve a la sección de pedidos y haz clic en "Agregar pedido".
2. Selecciona un cliente, productos o menús, conductor y dirección.
3. Revisa y guarda.

🟢 Restaurantes:
1. Ve a la sección de restaurantes.
2. Haz clic en "Agregar restaurante".
3. Llena nombre, dirección y teléfono.

🟢 Conductores:
1. Entra a conductores.
2. Haz clic en "Agregar conductor".
3. Ingresa nombre, teléfono, licencia y moto asignada.

🟢 Motos:
1. Accede al panel de motos.
2. Haz clic en "Agregar moto".
3. Llena modelo, placa y año.

🟢 Turnos:
1. Entra a turnos.
2. Haz clic en "Agregar turno".
3. Selecciona día, hora y conductor.

🟡 Inconvenientes:
1. Ve a la sección de "Inconvenientes" en el panel lateral.
2. Haz clic en "Agregar inconveniente".
3. Selecciona el pedido relacionado y describe el problema.
4. Guarda los cambios. El sistema notificará automáticamente al administrador.

🟡 Fotos:
1. Ve a la sección "Fotos".
2. Haz clic en "Subir foto".
3. Selecciona el pedido o entidad relacionada (como producto o conductor).
4. Elige la imagen desde tu dispositivo y confirma.

🟡 Ver ubicación de moto:
1. Entra a la sección "Pedidos".
2. Busca el pedido deseado y haz clic en el ícono 🗺️ de mapa.
3. Se abrirá una vista del mapa mostrando la ubicación actual de la moto asignada.

`;

export default function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [backendData, setBackendData] = useState('');

  useEffect(() => {
    const loadVoices = () => {
      const voicesList = window.speechSynthesis.getVoices();
      setVoices(voicesList);
    };
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  useEffect(() => {
    const endpoints = [
      'restaurants', 'products', 'menus', 'customers', 'orders',
      'addresses', 'motorcycles', 'drivers', 'shifts', 'issues', 'photos'
    ];

    const fetchAllData = async () => {
      try {
        const results = await Promise.all(
          endpoints.map(endpoint =>
            fetch(`${BACKEND_URL}/${endpoint}`)
              .then(res => res.json())
              .then(data => ({ endpoint, data }))
          )
        );

        const resumen = results.map(r =>
          `Datos de ${r.endpoint}:\n${JSON.stringify(r.data, null, 2)}`
        ).join('\n\n');

        setBackendData(resumen);
      } catch (error) {
        console.error('Error al obtener datos del backend:', error);
      }
    };

    fetchAllData();
  }, []);

  const speak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
    }

    const mouth = document.getElementById('cat-mouth');
    if (mouth) mouth.classList.add('talking');

    utterance.onend = () => {
      if (mouth) mouth.classList.remove('talking');
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const nuevoChat = [...chat, { sender: 'user', text: userMessage }];
    setChat(nuevoChat);
    setUserMessage('');
    setLoading(true);

    try {
      // --- PROMPT MODIFICADO PARA UN CONTROL MÁS ESTRICTO ---
      const prompt = `
Eres un asistente inteligente para la plataforma Flash Food.
Tu objetivo es guiar al usuario sobre cómo realizar acciones en la plataforma, como crear o editar elementos, o cómo usar ciertas funcionalidades.

**Instrucciones clave para tus respuestas:**
1.  **Formato:** Responde EXCLUSIVAMENTE con **texto plano**.
    * NO utilices asteriscos (*), guiones (-), comillas ("), ni ningún otro caracter de formato Markdown.
    * NO uses emojis. Si los emojis aparecen en la "Base de Conocimiento", ignóralos o descríbelos en texto si es absolutamente necesario (por ejemplo, "el ícono de mapa").
2.  **Contenido:**
    * No debes mostrar el contenido literal de la "Información actual del sistema" o "Conocimiento base". Utiliza esta información INTERNAMENTE para formular tu respuesta.
    * Tu respuesta debe ser una explicación clara y concisa sobre CÓMO hacer algo.
    * Si la pregunta del usuario es sobre "cómo crear un cliente", tu respuesta debe explicar los pasos para crear un cliente, sin enumerar todos los clientes existentes en el sistema.

**Conocimiento base sobre las funcionalidades de Flash Food:**
${KNOWLEDGE}

**Información actual del sistema (solo para tu contexto, NO la uses en tu respuesta):**
${backendData}

---
Pregunta del usuario: ${userMessage}
Respuesta del asistente (solo texto plano, siguiendo las instrucciones de formato y contenido):
`;


      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      const data = await response.json();
      let botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No pude entender tu mensaje.';
      
      // --- APLICA LA FUNCIÓN DE LIMPIEZA AQUÍ A LA RESPUESTA DE GEMINI ---
      botReply = limpiarTextoRespuesta(botReply); 

      setChat((prev) => [...prev, { sender: 'bot', text: botReply }]);
      speak(botReply); // Envía la respuesta limpia a la síntesis de voz

    } catch (error) {
      console.error('Error al comunicarse con Gemini:', error);
      setChat((prev) => [...prev, { sender: 'bot', text: 'Ocurrió un error al responder. Intenta nuevamente.' }]);
    }

    setLoading(false);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    const mouth = document.getElementById('cat-mouth');
    if (mouth) mouth.classList.remove('talking');
  };

  return (
    <Box
      className="chat-container"
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 20,
        mb: 3,
        p: 3,
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom>
        GustoBot
      </Typography>

      <Box className="cat-avatar" sx={{ mb: 2 }}>
        <div className="cat-eyes">
          <div className="cat-eye"><div className="pupil"></div></div>
          <div className="cat-eye"><div className="pupil"></div></div>
        </div>
        <div id="cat-mouth"></div>
      </Box>

      <Paper
        elevation={2}
        className='customers-scrollbar'
        sx={{
          width: '100%',
          minHeight: 180,
          maxHeight: 170,
          overflowY: 'auto',
          mb: 2,
          mt: 4,
          p: 2,
          bgcolor: '#23272f', // Fondo oscuro
          color: '#fff',      // Letra blanca
        }}
      >
        {chat.length === 0 ? (
          <Typography color="grey.400" align="center">
            ¡Hola! ¿En qué puedo ayudarte hoy?
          </Typography>
        ) : (
          chat.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                mb: 1.5,
                display: 'flex',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
              }}
            >
              <Paper
                sx={{
                  p: 1.2,
                  bgcolor: msg.sender === 'user' ? 'primary.main' : '#343a40', // Fondo diferente para usuario y bot
                  color: '#fff',
                  borderRadius: 2,
                  maxWidth: '80%',
                  minWidth: 80,
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#fff' }}>
                  {msg.text}
                </Typography>
              </Paper>
            </Box>
          ))
        )}
        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress size={24} color="inherit" />
          </Box>
        )}
      </Paper>

      <Stack direction="row" spacing={1} width="100%" alignItems="center" mb={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Escribe tu mensaje..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={loading || !userMessage.trim()}
        >
          Hablar
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={stopSpeech}
        >
          Detener
        </Button>
      </Stack>

      <FormControl fullWidth size="small" sx={{ mt: 1 }}>
        <InputLabel>Selecciona una voz</InputLabel>
        <Select
          value={selectedVoice}
          label="Selecciona una voz"
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          <MenuItem value="">Predeterminada</MenuItem>
          {voices.map((v, i) => (
            <MenuItem key={i} value={v.name}>{v.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}