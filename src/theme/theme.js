// src/theme/index.js
import { createTheme } from '@mui/material/styles';

// 1. Renk Paletini Tanımla
// Görseldeki o özel yeşil tonları ve koyu arka planı burada belirliyoruz.
const theme = createTheme({
    palette: {
        mode: 'dark', // Koyu mod aktif
        primary: {
            main: '#00E676', // Görseldeki o parlak yeşil buton rengi (Yaklaşık)
            contrastText: '#000000', // Yeşil butonun üzerindeki yazı rengi (Siyah okunur duruyor)
        },
        secondary: {
            main: '#29b6f6', // İkincil renk (İhtiyaç olursa)
        },
        background: {
            default: '#0A1915', // Sayfanın en arkasındaki çok koyu yeşil/siyah ton
            paper: '#11221F',   // Kartların ve Tablonun arka plan rengi (Biraz daha açık)
        },
        text: {
            primary: '#ffffff', // Ana yazılar beyaz
            secondary: '#b0bec5', // Açıklama, alt yazılar gri
        },
    },

    // 2. Typography (Yazı Tipleri)
    // MUI varsayılan olarak Roboto kullanır. İstersen buradan değiştirebilirsin.
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none', // ÖNEMLİ: MUI butonları varsayılan HEPSİ BÜYÜK yapar. Bunu kapatıyoruz.
            fontWeight: 600,
        },
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
    },

    // 3. Component Özelleştirmeleri (Overrides)
    // Global olarak tüm componentlerin varsayılan stillerini buradan değiştiriyoruz.
    components: {
        // Butonların hepsini biraz daha yuvarlak yapalım
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12, // Daha oval butonlar
                    padding: '8px 20px',
                },
            },
        },
        // Input alanları (TextField)
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12, // Inputların kenarları da yuvarlak olsun
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Hafif bir arka plan
                },
            },
        },
        // Tablo satırları
        MuiTableRow: {
            styleOverrides: {
                root: {
                    // Satırların üzerine gelince (hover) rengi değişsin
                    '&:hover': {
                        backgroundColor: 'rgba(0, 230, 118, 0.08) !important', // Hafif yeşil hover
                    },
                },
            },
        },
    },
});

export default theme;