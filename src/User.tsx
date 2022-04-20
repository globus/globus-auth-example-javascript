import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Identity } from './Types';

function userToTableData(user: Identity) {
  return [{
      property: "email",
      value: user.email,
    },
    {
      property: "last_authentication",
      value: user.last_authentication,
    },
    {
      property: "organization",
      value: user.organization,
    },
    {
      property: "name",
      value: user.name,
    },
    {
      property: "preferred_username",
      value: user.preferred_username,
    },
    {
      property: "sub",
      value: user.sub,
    },
    {
      property: "identity_provider",
      value: user.identity_provider,
    },
    {
      property: "identity_provider_display_name",
      value: user.identity_provider_display_name,
    }]
}

export default function User(props: {user: Identity}) {
  return (
    <Card>
      <CardHeader title={props.user.name}/>
      <CardContent style={{ flex: '1 0 auto' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Identity Field</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userToTableData(props.user).map((row) => (
              <TableRow
                key={row.property}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.property}
                </TableCell>
                <TableCell align="right">
                  {row.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained">
          Perform an action
        </Button>
      </CardActions>      
    </Card>
 );
}