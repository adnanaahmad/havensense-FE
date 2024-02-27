import './LandingPage.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

function LandingPage() {

  const navigate = useNavigate();
  
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    vertical: false,
    centerMode: true,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1220,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      
    ]
  };

  return (
    <main className={`landing-page position-relative`}>
      <header className={`landing-header full-width`}>
        <div className={`container`}>
          <div className={`header-inner d-flex justify-content-between align-items-center`}>
          <a href="/">
            <img src={`landing-page/logo.svg`} className=""/>
          </a>
            <Link
            className={`button-wrap d-inline-block`}
            component="a"
            onClick={() => navigate("/login")}
            >
              <span className={`button d-inline-block`}>
                <span className={`button-text d-inline-block`}>Get Started</span>
              </span>
            </Link>
          </div>
        </div>
      </header>
      <section className={`banner text-center full-width position-relative`}>
        <div className={`container`}>
          <h1 className={`title before-title-shade after-title-shade position-relative`}>Great Social Marketplace Made For True Sports Fans and Gamers!</h1>
        </div>
        <img src={`landing-page/army.png`} className={`banner-army d-flex position-relative`}/>
        <a href="#help-section">
          <img src={`landing-page/arrow-down.gif`} className={`down-icon position-relative`}/>
        </a>
        <div className={`divider`}></div>
      </section>
      <section id="help-section" className={`help-sec full-width position-relative`}>
        <div className={`container text-center`}>
          <h2 className={`title after-title-shade position-relative mb-3`}>We Help Your Brilliant Content To Become A <span className={`blue-text`}>Valuable</span> Earning Tool</h2>
          <p className={`summary`}>Becoming a Play-by-Play content creator is an exclusive opportunity for video creators, streamers, and social media influencers to gain revenue and grow their social media audience. Join us by signing up for HavenSense today!</p>
          <Tabs className={`help-tabs`}>
            <TabList>
              <Tab>Upload Short Videos</Tab>
              <Tab>Monetize from Online Engagement</Tab>
              <Tab>Digital Services & Products</Tab>
              <Tab>Grow Your Online Community</Tab>
            </TabList>

            <TabPanel>
              <div className="panel-content">
                <img src={`landing-page/help.png`} className={`help-img full-width`}/>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <img src={`landing-page/cartoon-nft.png`} className={`help-img full-width`}/>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <img src={`landing-page/help.png`} className={`help-img full-width`}/>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <img src={`landing-page/nft-col.png`} className={`help-img full-width`}/>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </section>
      <section className={`digital-assets-sec full-width position-relative`}>
        <div className={`container`}>
          <h2 className={`title after-title-shade text-center position-relative`}>Our <span className={`blue-text`}>Digital</span> Asset Categories</h2>
        </div>
        <div className={`digital-sec-slider full-width d-flex`}>
        <Slider {...settings} className={`full-width`}>
          <div className={`slide`}>
            <div className={`slide-img-wrap`}>
              <img src={`landing-page/slide-1.png`} className={`slide-img`} />
            </div>
            <div className={`slide-detail`}>
              <p className={`slide-title position-relative`}>Digital Media</p>
              <ul className={`slide-list`}>
                <li className={`slide-list-item`}>Movies</li>
                <li className={`slide-list-item`}>TV series</li>
                <li className={`slide-list-item`}>documentaries</li>
                <li className={`slide-list-item`}>and more!</li>
              </ul>
            </div>
          </div>
          <div className={`slide`}>
            <div className={`slide-img-wrap`}>
              <img src={`landing-page/slide-2.png`} className={`slide-img`} />
            </div>
            <div className={`slide-detail`}>
              <p className={`slide-title position-relative`}>Digital Games</p>
              <ul className={`slide-list`}>
              <li className={`slide-list-item`}>Single and multiplayer</li>
              <li className={`slide-list-item`}>free-to-play</li>
              <li className={`slide-list-item`}>paid games</li>
              <li className={`slide-list-item`}>and more!</li>
              </ul>
            </div>
          </div>
          <div className={`slide`}>
            <div className={`slide-img-wrap`}>
              <img src={`landing-page/slide-3.png`} className={`slide-img`} />
            </div>
            <div className={`slide-detail`}>
              <p className={`slide-title position-relative`}>Digital Gaming Assets</p>
              <ul className={`slide-list`}>
                <li className={`slide-list-item`}>In-game items</li>
                <li className={`slide-list-item`}>currencies</li>
                <li className={`slide-list-item`}>3D assets</li>
                <li className={`slide-list-item`}>and more!</li>
              </ul>
            </div>
          </div>
          
          <div className={`slide`}>
            <div className={`slide-img-wrap`}>
              <img src={`landing-page/slide-4.png`} className={`slide-img`} />
            </div>
            <div className={`slide-detail`}>
              <p className={`slide-title position-relative`}>Other Sports & Gaming Digital Assets</p>
              <ul className={`slide-list`}>
                <li className={`slide-list-item`}>NFTs & other collectibles</li>
                <li className={`slide-list-item`}>Online Training Courses</li>
                <li className={`slide-list-item`}>E-books</li>
                <li className={`slide-list-item`}>and more!</li>
              </ul>
            </div>
          </div>
          <div className={`slide`}>
            <div className={`slide-img-wrap`}>
              <img src={`landing-page/slide-5.png`} className={`slide-img`} />
            </div>
            <div className={`slide-detail`}>
              <p className={`slide-title position-relative`}>Digital Services</p>
              <ul className={`slide-list`}>
                <li className={`slide-list-item`}>Strategy Guides</li>
                <li className={`slide-list-item`}>Game Development</li>
                <li className={`slide-list-item`}>Sports Management</li>
                <li className={`slide-list-item`}>and more!</li>
              </ul>
            </div>
          </div>
        </Slider>
        </div>
      </section>
      <section className={`game-on-sec bg-cover-contain full-width position-relative`}>
        <div className={`container`}>
          <h2 className={`title after-title-shade text-center position-relative mb-3`}>It's Easy To Get Started. <span className={`blue-text`}>Game On.</span></h2>
          <div className={`game-on-slider gap-20 d-flex justify-content-center flex-wrap`}>
            <div className={`slide`}>
              <img src={`landing-page/user.png`} className={`slide-img mt-2 mb-3`} />
              <div className={`slide-detail`}>
                <p className='slide-text'>Sign up and create a profile. Be crazy. Be cool. Be you.</p>
              </div>
            </div>
            <div className={`slide`}>
              <img src={`landing-page/nft.png`} className={`slide-img mt-2 mb-3`} />
              <div className={`slide-detail`}>
                <p className='slide-text'>Curate exclusive offerings. Keep the surprises coming.</p>
              </div>
            </div>
            <div className={`slide`}>
              <img src={`landing-page/group.png`} className={`slide-img mt-2 mb-3`} />
              <div className={`slide-detail`}>
                <p className='slide-text'>Build a thriving community. Turn fans into super fans.</p>
              </div>
            </div>
            <div className={`slide`}>
              <img src={`landing-page/savings.png`} className={`slide-img mt-2 mb-3`} />
              <div className={`slide-detail`}>
                <p className='slide-text'>Grow income doing what you love. Go for glory.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`divider`}></div>
      <section className={`amazing-nft-sec full-width position-relative`}>
        <div className={`container`}>
          <div className={`full-width d-flex flex-wrap align-items-center`}>
            <div className={`col-sm-6`}>
              <h2 className={`title before-title-shade position-relative mb-4`}>Discover, Sell, & Buy <span className={`blue-text`}>Amazing</span> NFTs</h2>
              <p>Make money selling your NFT or Digital collectible collections</p>
            </div>
            <div className={`col-sm-6`}>
              <img src={`landing-page/nft-col.png`} className={`help-img full-width`}/>
            </div>
          </div>
          <div className={`nft-imgs-row full-width d-flex flex-wrap align-items-center justify-content-center mt-2 gap-20`}>
              <img src={`landing-page/cricket-nft.png`} className={`nft-img full-width`}/>
              <img src={`landing-page/panda-nft.png`} className={`nft-img full-width`}/>
              <img src={`landing-page/cartoon-nft.png`} className={`nft-img full-width`}/>
              <img src={`landing-page/football-nft.png`} className={`nft-img full-width`}/>
          </div>
        </div>
      </section>
      <section className={`community-passion-sec full-width position-relative`}>
        <section className={`community-sec full-width position-relative`}>
          <div className={`container`}>
            <h2 className={`title text-center`}>Build Online <span className={`blue-text`}>Community</span></h2>
            <div className={`nft-imgs-row full-width d-flex flex-wrap align-items-center justify-content-center mt-4 gap-20`}>
                <div className={`tag`}>
                  <img src={`landing-page/gamer.png`} className={`tag-img`} />
                  <p className={`tag-text`}>Fun To Explore</p>
                </div>
                <div className={`tag`}>
                  <img src={`landing-page/chill.png`} className={`tag-img`} />
                  <p className={`tag-text`}>Easy To Invite By URL</p>
                </div>
                <div className={`tag`}>
                  <img src={`landing-page/hacker.png`} className={`tag-img`} />
                  <p className={`tag-text`}>Work Together Remotely</p>
                </div>
                <div className={`tag`}>
                  <img src={`landing-page/game.png`} className={`tag-img`} />
                  <p className={`tag-text`}>Easy To Export Video</p>
                </div>
                <div className={`tag`}>
                  <img src={`landing-page/hacker2.png`} className={`tag-img`} />
                  <p className={`tag-text`}>Mobile & Desktop Compatible</p>
                </div>
            </div>
          </div>
        </section>
        <section className={`passion-sec full-width position-relative`}>
          <div className={`container`}>
            <div className={`passion-area text-center`}>
              <h2 className={`title`}>Turn your passion into <span className={`blue-text`}>profits</span></h2>
              <Link
              className={`button-wrap d-inline-block`}
              component="a"
              onClick={() => navigate("/login")}
              >
                <span className={`button d-inline-block`}>
                  <span className={`button-text d-inline-block`}>Get Started</span>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </section>
      <footer className={`footer-main full-width position-relative`}>
        <div className={`container`}>
          <a href={`#`} className={`back-to-top`}><img src={`landing-page/arrow-down.gif`}  className={`full-width`}/></a>
          <div className={`footer-inner d-flex justify-content-between`}>
            <a href="/">
              <img src={`landing-page/logo.svg`}/>
            </a>
            <div className={`contact-info flex-1`}>
              <p className={`heading position-relative`}>Contact</p>
              <a href="mailto:hello@havensense.com">hello@havensense.com</a>
            </div>
          </div>
          <div className={`copyright-bar full-width d-flex justify-content-between`}>
            <p>© 2023 HavenSense, All Rights Reserved</p>
            <nav className={`d-flex gap-30`}>
              <a href={`https://www.havensense.com/privacy-policy`} target="_blank">Privacy Policy</a>
              <a href={`https://www.havensense.com/terms-and-conditions`} target="_blank">Terms and Conditions</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default LandingPage;
