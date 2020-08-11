import React from 'react';
import styled from 'styled-components';

type VideoType = {
	key: string;
	site: string;
	type: string;
	name: string;
};
type CompanyType = {
	logo_path: string;
	name: string;
	origin_country: string;
};
type SeasonType = {
  air_date:string;
  name:string;
  episode_count:number;
  poster_path:string;
}
type TabInterface = {
	menu: string;
	info: {
		videos: {
			results: Array<VideoType>;
		};
    production_companies?: Array<CompanyType>;
    seasons?:Array<SeasonType>;
	};
};
type ImageInterface = {
	bgUrl: string;
};

const ProductionCompany = styled.div`
	display: flex;
	flex-direction: column;
`;
const CompanyInfo = styled.div`
	display: flex;
	margin: 10px 0;
`;

const CompanyLogo = styled.img`
	width: 100px;
	height: 10-px;
`;
const CompanyNameContainer = styled.div`
	display: flex;
	align-items: center;
`;
const CompanyName = styled.span`
	background-color: rgba(0, 0, 0, 0.5);
	text-align: center;
	font-size: 16px;
	color: rgba(255, 255, 255, 0.8);
	border-radius: 5px;
	padding: 10px;
	margin: 3px;
`;

const Countries = styled.img`
	width: 30px;
	height: 30px;
`;
const SeasonInfo = styled.div`
  display:flex;
`;
const SeasonsContainer = styled.div`
font-size: 12px;
margin: 5px;
`;

const SeasonsImage = styled.div`
  background-image: url(${(props: ImageInterface) => props.bgUrl});
  width:125px;
	height: 180px;
	background-size: cover;
	border-radius: 4px;
	background-position: center center;
	transition: opacity 0.2s linear;
`;
const SeasonsCount = styled.span`
	bottom: 5px;
	right: 5px;
	position: absolute;
	opacity: 0;
	transition: opacity 0.2s linear;
`;
const ImageContainer = styled.div`
	margin-bottom: 5px;
	position: relative;
	&:hover {
		${SeasonsImage} {
			opacity: 0.3;
		}
		${SeasonsCount} {
			opacity: 1;
		}
	}
`;
const SeasonsTitle = styled.span`
	display: block;
	font-size: 12px;
	margin-bottom: 3px;
`;
const SeasonsYear = styled.span`
	font-size: 10px;
	color: rgba(255, 255, 255, 0.5);
`;

const DetailTabPresenter = ({ menu, info }: TabInterface) => {
	if (menu === 'video') {
    const key = info.videos?.results[0]?.key || '';
    if(key===''){
      return null;
    }
		return <iframe title={info.videos.results[0].name} src={`https://www.youtube.com/embed/${info.videos.results[0].key}`} />;
	} else if (menu === 'production' && info.production_companies && info.production_companies.length > 0) {
		return (
			<ProductionCompany>
				{info.production_companies.map((company) => (
					<CompanyInfo>
						<CompanyLogo
							src={
								company.logo_path ? (
									`https://image.tmdb.org/t/p/original${company.logo_path}`
								) : (
									require('../../assets/noPosterSmall.png')
								)
							}
						/>
						<CompanyNameContainer>
							<CompanyName>{company.name}</CompanyName>
							<Countries src={`https://www.countryflags.io/${company.origin_country}/shiny/64.png`} />
						</CompanyNameContainer>
					</CompanyInfo>
				))}
			</ProductionCompany>
		);
	} else if( menu==='seasons' && info.seasons) {
    return (
      <SeasonInfo>
        {info.seasons.map(season=>(
          <SeasonsContainer>
            <ImageContainer>
              <SeasonsImage 
                bgUrl={season.poster_path ?
                    `https://image.tmdb.org/t/p/w300/${season.poster_path}` : require('../../assets/noPosterSmall.png')}/>
              <SeasonsCount>{season.episode_count} Episode </SeasonsCount>
            </ImageContainer>
            <SeasonsTitle>{season.name}</SeasonsTitle>
			      <SeasonsYear>{season.air_date}</SeasonsYear>
          </SeasonsContainer>
        ))}
      </SeasonInfo>

    )
  }
	console.log(menu);
	console.log(info);
	return null;
};

export default DetailTabPresenter;
