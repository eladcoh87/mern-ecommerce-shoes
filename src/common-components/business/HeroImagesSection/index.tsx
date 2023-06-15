import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import { history } from '@base/features';

import './style.scss';

export type Props = {};

const heroImagesSection: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	return (
		<div className="hero-container">
			<Carousel className="carusela-images-container" infiniteLoop showThumbs={false}>
				<div className="image-wraper">
					<img
						className="hero-image"
						alt="men"
						src="https://images.unsplash.com/photo-1494607239400-ff147da48308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80"
					/>
					<div className="overlay-image-text">
						<span className="learn-span">Learn as if you will live forever</span>
						<span className="live-span">
							live like you will die tomorrow - sales is evrating do what u do
						</span>{' '}
						<br />
						<Button onClick={() => history.push('/all-products')} variant="contained">
							SHOP NOW
						</Button>
					</div>
				</div>
				<div className="image-wraper">
					<img
						className="hero-image"
						alt="men"
						src="https://images.unsplash.com/photo-1536679815115-54d2bb2c6076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
					/>
					<div className="overlay-image-text">
						<span className="learn-span">It is only when we take chances</span>
						<span className="live-span">
							The initial and the most difficult risk that we need to take is to become honest
						</span>{' '}
						<br />
						<Button onClick={() => history.push('/all-products')} variant="contained">
							SHOP NOW
						</Button>
					</div>
				</div>
			</Carousel>
			<div className="tree-images-wraper">
				<Card className="tree-images-card-wraper">
					<CardActionArea>
						<div className="overlay-image-box">
							<CardMedia
								component="img"
								image="https://images.unsplash.com/photo-1637437757614-6491c8e915b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
								alt="green iguana"
							/>
							<div className="overlay-image-text">
								<h3 className="overlay-image-text-headline">push it to</h3>

								<p className="overlay-image-text-para">
									When you give joy to other people, you get more joy in return
								</p>
							</div>
							<div className="fadedbox">
								<div className="title text">
									{' '}
									I never lose. <br /> I either win or learn{' '}
									<p className="sales-text">sales is evrating do what u do</p>{' '}
								</div>
							</div>
						</div>
					</CardActionArea>
				</Card>
				<Card className="tree-images-card-wraper">
					<CardActionArea>
						<div className="overlay-image-box">
							<CardMedia
								component="img"
								image="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
								alt="green iguana"
							/>
							<div className="overlay-image-text">
								<h3 className="overlay-image-text-headline">COMFORT ZONE</h3>

								<p className="overlay-image-text-para">
									When you give joy to other people, you get more joy in return
								</p>
							</div>
							<div className="fadedbox">
								<div className="title text">
									{' '}
									I never lose. <br /> I either win or learn{' '}
									<p className="sales-text">sales is evrating do what u do</p>{' '}
								</div>
							</div>
						</div>
					</CardActionArea>
				</Card>
				<Card className="tree-images-card-wraper">
					<CardActionArea>
						<div className="overlay-image-box">
							<CardMedia
								component="img"
								image="https://images.unsplash.com/photo-1637437757614-6491c8e915b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
								alt="green iguana"
							/>
							<div className="overlay-image-text">
								<h3 className="overlay-image-text-headline">CHALLNGE DONE</h3>

								<p className="overlay-image-text-para">
									When you give joy to other people, you get more joy in return
								</p>
							</div>
							<div className="fadedbox">
								<div className="title text">
									{' '}
									I never lose. <br /> I either win or learn{' '}
									<p className="sales-text">sales is evrating do what u do</p>{' '}
								</div>
							</div>
						</div>
					</CardActionArea>
				</Card>
			</div>
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(heroImagesSection);
