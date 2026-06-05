import React from 'react'
import ProfessionalDetailsPage from '../[id]/page'
import NewProfessionalPage from '../new/page'

interface ProfessionalProfileClientProps{
  professional: string;
}

const ProfessionalProfileClient = ({ professional }: ProfessionalProfileClientProps) => {
  return (
    <div>
      
      {professional ? (
              <>
                <ProfessionalDetailsPage />
              </>
          ) : (
              <>
                <NewProfessionalPage />
              </>
          )
      } 
    </div>
  )
}

export default ProfessionalProfileClient