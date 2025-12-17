import {useGetAllQuestionsQuery} from "./slice/panelApi.js";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export default function QuestionPage() {

    const {data: questions, isLoading} = useGetAllQuestionsQuery({});

    console.log("DATA : ",questions)

    return (
        <div style={{height: 400, width: 400}}>
            <TableContainer>
                <Table aria-label="Soru Listesi tablo">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color: '#aaaa'}}> ID </TableCell>
                            <TableCell> Soru </TableCell>
                            <TableCell> Level </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {questions?.data?.map((row) => (
                            <TableRow key={row.id}
                                      hover>
                                <TableCell> {row.questionText} </TableCell>
                                <TableCell> {row.isActivate} </TableCell>
                                <TableCell> {row.questionLevel} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}