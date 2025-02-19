// Categories.tsx
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import React, { useState } from 'react';
import "./Categories.css"

interface CategoriesProps { onCategoryChange: (categories: string[]) => void }

const Categories: React.FC<CategoriesProps> = ({ onCategoryChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleButtonClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className='categories'>
      <IonGrid>
        <IonRow>
          <IonCol size="4" >
            <IonButton
              expand="block"
              shape="round"
              className="custom-button"
              onClick={() => handleButtonClick('2cd00bebec0c48ba9db761da48678134')}
              color={selectedCategories.includes('2cd00bebec0c48ba9db761da48678134') ? 'primary' : 'light'}
            >
              initiatives
            </IonButton>
          </IonCol>
          <IonCol size="4" >
            <IonButton
              shape="round"
              expand="block"
              className="custom-button"
              onClick={() => handleButtonClick('77b3c33a92554bcf8e8c2c86cedd6f6f')}
              color={selectedCategories.includes('77b3c33a92554bcf8e8c2c86cedd6f6f') ? 'primary' : 'light'}
            >
              companies
            </IonButton>
          </IonCol>
          <IonCol size="4" >
            <IonButton
              shape="round"
              expand="block"
              className="custom-button"
              onClick={() => handleButtonClick('events')}
              color={selectedCategories.includes('events') ? 'primary' : 'light'}
            >
              events
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default Categories;
