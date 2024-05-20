import { Button } from '@mui/material'
import React from 'react'

export default function Readings() {
  return (
    <div className="lessons-page">
      <div className="content">
        <div className='title' style={{marginTop: -15}}>
          <h1>The Readings</h1>
        </div>
        <div className='description-container' >
          <h2 className='description'>A three-card tarot spread unveils profound insights into your life's journey. 
          <br /><br />The first card illuminates the experiences and lessons from the <span style={{textDecorationLine: 'underline'}}>past</span> that shape your current reality. 
          <br /><br />The second card reflects the energies and influences surrounding you in the <span style={{textDecorationLine: 'underline'}}>present</span> moment. 
          <br /><br />The third card unveils the potential <span style={{textDecorationLine: 'underline'}}>futures</span> that await, guiding you towards your highest path. 
          <br /> <br />By interpreting the symbolism within each card, you unlock the hidden wisdom of the tarot, gaining profound self-discovery and enlightenment.</h2>
        </div>
        <Button 
              className='reading-button '
              variant="contained" 
              sx={{ mt: 6, backgroundColor: '#1E5F22', fontFamily: 'cursive'}}>
                Get a Reading
        </Button>
      </div>
    </div>
  )
}
