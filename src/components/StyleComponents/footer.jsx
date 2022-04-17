import * as React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import Button from '@mui/material/Button';
import styles from './footer.module.css';

export default function StyleHomePagebaner() {
  return (
    <footer>
      <div className={styles.footer_info}>
        <ul className={styles.footer_info_link}>
          <li>
            <Button
              startIcon={<InfoOutlinedIcon />}
              className={styles.social_link}
            >
              About Us
            </Button>
          </li>
          <li>
            <Button
              startIcon={<ContactPageOutlinedIcon />}
              className={styles.social_link}
            >
              Contacts
            </Button>
          </li>
          <li>
            <Button
              startIcon={<AccountTreeOutlinedIcon />}
              className={styles.social_link}
            >
              Our projects
            </Button>
          </li>
        </ul>
      </div>
      <div className={styles.social_links_div}>
        <div>
          <Button className={styles.social_link}>
            <InstagramIcon fontSize="large" />
          </Button>
        </div>
        <div>
          <Button className={styles.social_link}>
            <LinkedInIcon fontSize="large" />
          </Button>
        </div>
        <div>
          <Button className={styles.social_link}>
            <FacebookIcon fontSize="large" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
