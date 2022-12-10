import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Chip, Drawer, Skeleton, TextField } from '@mui/material';
import axios from 'axios';

function App() {

  let [data, setData] = useState(null);

  let [viewFull, setViewFull] = useState(null);

  let [loading, setLoading] = useState(false);

  let [search, setSearch] = useState("Apple");

  const searchFood = (event) => {
    event.preventDefault();

    setLoading(true);
    setData(null);
    axios.get(process.env.REACT_APP_X_RAPIDAPI_URL, {
        params: {ingr: search},
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_X_RAPIDAPI_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_X_RAPIDAPI_HOST
        }
    }).then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoading(false);
    })
  }

  return <div className="App">
   
    
    <div className="container  mx-auto py-5">
      <br />
      <Typography variant="h3" component="div" className='mt-5' gutterBottom>
        Food Search
      </Typography>
      <Typography variant="h6" component="div">
        This App provides you with tools to find nutrition and diet data for generic foods, packaged foods and restaurant meals.
      </Typography>
      <br />
      <form className='d-flex align-items-center' onSubmit={searchFood}>
        <TextField
            required
            label="Search Food"
            className='w-100'
            size='small'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        &nbsp;&nbsp;
        <div>
          <Button variant="contained" type="submit">Search</Button>
        </div>
      </form>
      <br />

      <div className="row g-4">

        {
          data && data.hints.map((item, index) => {
              return <div className="col-6 col-md-4 col-lg-3" key={`${index}-${item.food.foodId}`}>
                  <Card className="shadow-lg">
                      <CardMedia
                          component="img"
                          height="194"
                          image={item.food.image ?? require('./6f8a8452-8f19-4332-908a-fcf1c6318dc9.png')}
                          alt="Paella dish"
                        />
                      <CardContent>
                        <Chip label={item.food.categoryLabel} size="small"/>
                        &nbsp;&nbsp;
                        <Chip label={item.food.category} size="small"/>
                        <Typography variant="h6" component="div">
                          {item.food.label}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => setViewFull(item)} color="error" >Learn More</Button>
                      </CardActions>
                  </Card>
              </div>
          })
        }

        <div className="text-center">
          {
            data && data.hints.length == 0 && <Typography variant="button" className="py-5" component="div">No Data Found</Typography>
          }

          {(!data && !loading) && <Typography variant="button" className="py-5" component="div">Please Search Any Food name</Typography>}
        </div>



        {loading && <div className='d-flex gap-2 flex-wrap'>
          <div className='d-flex flex-column'>
            <Skeleton variant="rectangular" width={210} height={118} className="mb-3" />
            <Skeleton variant="rectangular" width={180} height={15} className="mb-2" />
            <Skeleton variant="rectangular" width={140} height={15} />
          </div>
          <div className='d-flex flex-column'>
            <Skeleton variant="rectangular" width={210} height={118} className="mb-3" />
            <Skeleton variant="rectangular" width={180} height={15} className="mb-2" />
            <Skeleton variant="rectangular" width={140} height={15} />
          </div>
          <div className='d-flex flex-column'>
            <Skeleton variant="rectangular" width={210} height={118} className="mb-3" />
            <Skeleton variant="rectangular" width={180} height={15} className="mb-2" />
            <Skeleton variant="rectangular" width={140} height={15} />
          </div>
        </div>}


        {
          viewFull != null && <>
              <Drawer
                anchor={"bottom"}
                open={true}
                onClose={() => setViewFull(null)}
              >
                
                    <div className='p-5' style={{ position: 'relative'}}>
                        <div className="foodImage-drawer">
                            <img src={viewFull.food.image ?? require('./6f8a8452-8f19-4332-908a-fcf1c6318dc9.png')} />
                        </div>

                        <br />

                        <Chip label={viewFull.food.categoryLabel} size="small"/>
                        &nbsp;&nbsp;
                        <Chip label={viewFull.food.category} size="small"/>
                        <Typography variant="h6" component="div">
                          {viewFull.food.label}
                        </Typography>

                        <br />

                        <Typography gutterBottom variant="button" className="fw-bold" component="div">
                          Nutrients
                        </Typography>

                         <div style={{maxWidth: "450px"}}>
                            <table className="table table-borderless">
                              <tbody>
                                  {
                                        Object.keys(viewFull.food.nutrients).map((key, index) => {
                                            return <tr key={index}>
                                                <td>{key}</td>
                                                <td>{viewFull.food.nutrients[key]}</td>
                                            </tr>
                                        })
                                    }
                              </tbody>
                            </table>
                         </div>

                        <br />
                                
                        <Button size="small" onClick={() => setViewFull(null)} variant="contained">Close</Button>
                    </div>

              </Drawer>
          </>
        }
       

      </div>
    </div>

  </div>;
}

export default App;
