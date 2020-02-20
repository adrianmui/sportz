import React from 'react'
import { get } from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  toolbar__root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  toolbar__title: {
    flex: '1 1 100%',
  },
}))

// displays row properties in the order of column indexes
export function DenseTable({ rows, columns, title }) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      {title && (
        <Toolbar className={classes.toolbar__root}>
          <Typography className={classes.toolbar__title} variant="h6">
            {title}
          </Typography>
        </Toolbar>
      )}
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
          {columns.map(({ label }, colIndex) => (
            <TableCell key={colIndex} align='left'>
               {label}
            </TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => {
            const PropCells = columns.map(({ property, defaultValue }, rowColIndex) => (
              <TableCell key={rowColIndex} align='left'>
                {get(row, property, defaultValue)}
              </TableCell>
            ))
            
            return  (
              <TableRow key={rowIndex}>
              {PropCells}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}