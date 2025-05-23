import React from "react";
import {
  GraficoCircular1, GraficoCircular2, GraficoCircular3,
  GraficoBarras1, GraficoBarras2, GraficoBarras3,
  GraficoSeries1, GraficoSeries2, GraficoSeries3
} from "../../components/graficos";

import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

// Datos para los gráficos de barras de cada grupo


function App() {
  return (
    <Box component="main" sx={{ mt: 70, mx: 3, mb: 4 }}>
      <Card elevation={3} sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Dashboard de Gráficos
          </Typography>

          <Grid container spacing={4}>
            {/* Grupo 1 */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" mb={2}>
                Grupo 1
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <GraficoCircular1 />
                <GraficoBarras1  />
                <GraficoSeries1 />
              </Box>
            </Grid>

            {/* Grupo 2 */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" mb={2}>
                Grupo 2
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <GraficoCircular2 />
                <GraficoBarras2  />
                <GraficoSeries2 />
              </Box>
            </Grid>

            {/* Grupo 3 */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" mb={2}>
                Grupo 3
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <GraficoCircular3 />
                <GraficoBarras3  />
                <GraficoSeries3 />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default App;
