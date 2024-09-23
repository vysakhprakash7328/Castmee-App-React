import React, { useState } from "react";
import styled, { css } from "styled-components";

const styles = {
  SelectText: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '42px',
    textAlign: 'center',
    margin: '40px 0',
  },
};

const Container = styled.div`
    display: flex,
    justify-content: center,
    gap: 20px,
    flex-wrap: wrap,
    max-width: 800px,
    margin: 0 auto,
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;
  max-width: 50%;
  height: 400px;
`;

const LargeImageContainer = css`
  grid-column: span 2;
  grid-row: span 2;
  width: 250px;
  height: 250px;
`;

const SmallImageContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 24px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  ${({ large }) => large && LargeImageContainer}
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ index }) =>
    index === 0
      ? css`
          grid-column: span 2;
          grid-row: span 2;
        `
      : index === 1
      ? css`
          grid-column: 1;
          grid-row: 3;
        `
      : index === 2
      ? css`
          grid-column: 2;
          grid-row: 3;
        `
      : index === 3
      ? css`
          grid-column: 3;
          grid-row: 1;
        `
      : index === 4
      ? css`
          grid-column: 3;
          grid-row: 2;
        `
      : css`
          grid-column: 3;
          grid-row: 3;
        `}
`;

const AddButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #161616;
`;

const Input = styled.input`
  display: none;
`;


const UploadPhotos = () => {
    const [images, setImages] = useState([
        "https://assets.api.uizard.io/api/cdn/stream/856337a9-51dc-4541-bf28-97ffaa90906d.png",
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200",
      ]);
    
      const handleImageUpload = (e, index) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const newImages = [...images];
            newImages[index] = reader.result;
            setImages(newImages);
          };
          reader.readAsDataURL(file);
        }
      };

  return (
    <Container>
      <div style={styles.SelectText}>Upload Photos</div>
      <GridContainer>
            {images.map((image, index) => (
              <Card key={index} index={index}>
                <SmallImageContainer
                  large={index === 0}
                  style={{ backgroundImage: `url(${image})` }}
                />
                <AddButton
                  onClick={() =>
                    document.getElementById(`fileInput-${index}`).click()
                  }
                >
                  +
                </AddButton>
                <Input
                  type="file"
                  id={`fileInput-${index}`}
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index)}
                />
              </Card>
            ))}
          </GridContainer>
    </Container>
  );
};

export default UploadPhotos;
