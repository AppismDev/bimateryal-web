import React from "react";
import _ from 'lodash'
import { Grid, GridRow, Image, TableRow } from "semantic-ui-react";
import { Button, Card ,CardMeta, Placeholder } from 'semantic-ui-react'

const products = [
  {
    avatar: 'https://productimages.hepsiburada.net/s/273/550/110000258934394.jpg/format:webp',
    date: 'Joined in 2013',
    header: 'Acer Aspire 3 A315-56-327T ',
    description: 'Intel Core i3 1005G1 8GB 256GB SSD Freedos 15.6 FHD Taşınabilir Bilgisayar NX.HS5EY.006',
  },
  {
    avatar: 'https://productimages.hepsiburada.net/s/125/222-222/110000075577551.jpg/format:webp',
    date: 'Joined in 2013',
    header: 'Ne İçin Varsan Onun İçin Yaşa',
    description: 'Hikmet Anıl Öztekin',
  },
  {
    avatar: 'https://productimages.hepsiburada.net/s/26/550/10164714111026.jpg/format:webp',
    date: 'Joined in 2013',
    header: 'Pilsan Bingo Kaydırak Seti',
    description: 'Primary Contact',
  },
]

export default class home extends React.Component {
  state = { loading: false }
  render() {
    const { loading } = this.state
  
  return (
    <div>
      <h2>POPÜLER KATEGORİLER</h2>

      <TableRow>
          <img style={{width: "120px", marginRight: "16px"}} src="https://react.semantic-ui.com/images/wireframe/image.png" />
          <img style={{width: "120px", marginRight: "16px"}} src="https://react.semantic-ui.com/images/wireframe/image.png" />
          <img style={{width: "120px", marginRight: "16px"}} src="https://react.semantic-ui.com/images/wireframe/image.png" />
      </TableRow>

      <h2>POPÜLER KULLANICILAR</h2>
      <TableRow>
      <img style={{width: "120px", marginRight: "16px"}} src="https://react.semantic-ui.com/images/wireframe/image.png" />
          <img style={{width: "120px", marginRight: "16px"}} src="https://react.semantic-ui.com/images/wireframe/image.png" />
          <img style={{width: "120px", marginRight: "16px"}} src="https://react.semantic-ui.com/images/wireframe/image.png" />
      </TableRow>

      <h2>Yeni Ürünler</h2>
      <Card.Group itemsPerRow={3} stackable style={{marginBottom: "16px"}} doubling>
          {products.map((product) => (
            <Card key={product.header}>
              {loading ? (
                <Placeholder>
                  <Placeholder.Image square />
                </Placeholder>
              ) : (
                <Image src={product.avatar} />
              )}

              <Card.Content>
                {loading ? (
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length='very short' />
                      <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length='short' />
                    </Placeholder.Paragraph>
                  </Placeholder>
                ) : (
                  <>
                    <Card.Header>{product.header}</Card.Header>
                    <Card.Meta>{product.date}</Card.Meta>
                    <Card.Description>{product.description}</Card.Description>
                  </>
                )}
              </Card.Content>

              <Card.Content extra>
                <Button disabled={loading} primary>
                  Add
                </Button>
                <Button disabled={loading}>Delete</Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
    </div>
  );
}}
