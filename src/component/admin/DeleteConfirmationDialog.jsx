import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Alert
} from "@mui/material";
import {Warning as WarningIcon} from "@mui/icons-material";

export default function ConfirmationDialog({
    open,
    onClose,
    onConfirm,
    questionText,
    dialogTitle,
    dialogContent,
    isDeleting = false
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogContent>
                <Alert severity="warning">
                    <Typography variant="body1" sx={{mb: 1}}>
                        <strong>{questionText}</strong>
                    </Typography>
                    <Typography variant="body2">
                        {dialogContent}
                    </Typography>
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    disabled={isDeleting}
                    color="inherit"
                >
                    İptal
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={isDeleting}
                    color="primary"
                    variant="contained"
                >
                    {isDeleting ? 'İşlem Tamamlanıyor...' : 'Evet'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
