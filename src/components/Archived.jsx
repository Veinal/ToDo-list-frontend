import React from 'react'
import Sidebar from './Sidebar'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Archived() {
    return (
        <div>
            <div className="flex min-h-screen flex-row bg-gray-100 text-gray-800">
                <div>
                    <Sidebar />
                </div>
                <div className="flex flex-col h-full w-full p-10 bg-white shadow-md m-4">
                    <h1 className=' text-center font-bold text-4xl underline'>ARCHIVED</h1>

                    <Card sx={{ width: 350,height:256,border:'2px solid gray' }} variant='outlined'>
                        <CardContent>
                            <Typography>
                                Word of the Day
                            </Typography>
                            
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </div>
    )
}
