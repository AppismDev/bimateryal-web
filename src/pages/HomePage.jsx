import React from "react";
import _ from 'lodash'
import { Grid, GridRow, Image } from "semantic-ui-react";
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
    <Grid columns={4} divided>
      <h2>POPÜLER KATEGORİLER</h2>
      <Grid.Row>
        <Grid.Column >
          <GridRow >Kitaplar</GridRow>
          <GridRow>Okuma Kitapları</GridRow>
          <Image src="public\kitap.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>{" "}
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>
      </Grid.Row>

      <h2>POPÜLER KULLANICILAR</h2>
      <Grid.Row columns={4} divided>
        <Grid.Column>
          <GridRow>Kitaplar</GridRow>
          <GridRow>Okuma Kitapları</GridRow>
          <Image src=" " />
        </Grid.Column>
        <Grid.Column>
          <Image src="/https://instagram.fasr1-2.fna.fbcdn.net/v/t51.2885-19/282167607_577951366938300_3378994294691656488_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fasr1-2.fna.fbcdn.net&_nc_cat=100&_nc_ohc=7enFG8jx1QYAX9PCCXs&tn=e63r-r-rS2j5pirM&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAy9F-VMj72aitNgf_x9q35tUmpMz-i0YY8Y6vxNAxbww&oe=6364A1B0&_nc_sid=8fd12b/wireframe/media-paragraph.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>{" "}
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>
      </Grid.Row>

      <h2>Yeni Ürünler</h2>
      <Card.Group doubling itemsPerRow={3} stackable>
          {_.map(products, (product) => (
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
    </Grid>
  );
}}
