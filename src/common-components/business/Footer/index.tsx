import { Container } from '@mui/material';
import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import './style.scss';
import FollowUsIcons from '../FollowUsIcons';

export type Props = {};

const footer: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	return (
		<div className="footer-Wraper">
			<Container className="footer-container" maxWidth="xl">
				<div className="footer-logo">
					<h3>
						SNEA<span>KER.</span>
					</h3>

					<div className="support">
						<div>
							<PhoneInTalkOutlinedIcon />
						</div>
						<p>+ (012) 800 456 789</p> <p>lorem20</p>
					</div>
					<div className="support-para">
						<p>
							We are a team of designers and developers who creates high quality multipurpose and
							responsive premium Shopify themes.
						</p>
					</div>
					<FollowUsIcons />
				</div>
				<div className="footer-mainmenu">
					<p>MAIN MENU</p>
					<ul className="mainmenu-ul-wraper">
						<li>home</li>
						<li>For Men</li>
						<li>For Women</li>
						<li>For Kids</li>
						<li>Top Products</li>
						<li>Buy</li>
						<li>Pages</li>
					</ul>
				</div>
				<div className="footer-mainmenu">
					<p>MAIN MENU</p>
					<ul className="mainmenu-ul-wraper">
						<li>home</li>
						<li>For Men</li>
						<li>For Women</li>
						<li>For Kids</li>
						<li>Top Products</li>
						<li>Buy</li>
						<li>Pages</li>
					</ul>
				</div>

				<div className="footer-blog">
					{' '}
					<p className="">FROM OUR BLOG</p>{' '}
					<div className="footer-blog-post-wraper">
						<div className="image-warper">
							<img
								src="https://images.pexels.com/photos/1192043/pexels-photo-1192043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
								alt=""
							/>
						</div>
						<div className="blog-post-wraper">
							<h4>Opportunities dont happen</h4>
							<p>Posted By: frnendes rotini</p>
						</div>
					</div>
					<div className="footer-blog-post-wraper">
						<div className="image-warper">
							<img
								src="https://images.pexels.com/photos/1032109/pexels-photo-1032109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
								alt=""
							/>
						</div>
						<div className="blog-post-wraper">
							<h4>Love your family, work super hard</h4>
							<p>Posted By: jon goth</p>
						</div>
					</div>
				</div>

				<div className="footer-contact">
					{' '}
					<p>GET IN TOUCH</p>{' '}
					<div className="contact-info">
						<p>Address :123 Main Street, Anytown, CA 12345 - USA.</p>
						<p>Phone :+ (012) 800 456 789</p>
						<p>Email :support@masstechnologist.com</p>
					</div>
					<div className="contact-info">
						<p className="contact-open">OPENING TIME</p> <p>Open: 8:00 AM - Close: 18:00 PM</p>
						<p>Saturday - Sunday: Close</p>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(footer);
