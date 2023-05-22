import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

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
					<p className="legend">Legenddfd 1</p>
				</div>
				<div>
					<img
						className="hero-image"
						alt="men"
						src="https://images.unsplash.com/photo-1536679815115-54d2bb2c6076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
					/>
					<p className="legend">Legend 2</p>
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
								<h3 className="overlay-image-text-headline">SPORT AIR</h3>

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
								image="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
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
