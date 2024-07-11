import ApplicationLogo from '@/Components/ApplicationLogo';
import MenuBtn from '@/Components/MenuBtn';
import { Link, Head } from '@inertiajs/react';
import '../../css/welcome.css';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome() {
    return (
        <>
        <GuestLayout>

            <Head title="Welcome" />
            
            <main className="main">
                <div className="featured_container">
                    <div className="featured_content">
                        <div className="img_container featured">
                            <img
                                src="/img/image.png"
                                alt="THIS IS A FEATURED ARTICLE IMAGE"
                            />
                        </div>
                        <div className="featured_title">
                            <div className="featured_btns">
                                <h4>FEATURED ARTICLE</h4>
                                <a className="title" href="/article.html"
                                    >Barangay Canibungan Proper Residents to Benefit
                                    From New KALAHI-Funded Road</a
                                >
                            </div>
                            <small>By <span>Jessel Zapanta</span></small>
                        </div>
                    </div>
                </div>
                {/* <!-- Main side post (most popular) --> */}
                <div className="main_post_container">
                    {/* <!--  --> */}
                    <div className="post">
                        <div className="img_container side_post">
                            <img src="/img/image.png" alt="" />
                        </div>
                        <div className="post_info">
                            <div className="post_btns">
                                <a href="" className="category_title">NEWS</a>
                                <a href="" className="post_title">
                                    most viewed,like,comment, ratings,reading
                                    time(sa article, with analytics sa admin og sa
                                    ga publish)
                                </a>
                            </div>
                            <small>By <span>Jessel Zapanta</span></small>
                        </div>
                    </div>
                    {/* <!--  --> */}
                    <div className="post">
                        <div className="img_container side_post">
                            <img src="/img/TORCH INFOGRAPHICS (1).png" alt="" />
                        </div>
                        <div className="post_info">
                            <div className="post_btns">
                                <a href="" className="category_title">NEWS</a>
                                <a href="" className="post_title">
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Impedit, illo!
                                </a>
                            </div>
                            <small>By <span>Jessel Zapanta</span></small>
                        </div>
                    </div>
                    {/* <!--  --> */}
                    <div className="post">
                        <div className="img_container side_post">
                            <img src="/img/bg_new.png" alt="" />
                        </div>
                        <div className="post_info">
                            <div className="post_btns">
                                <a href="" className="category_title">NEWS</a>
                                <a href="" className="post_title">
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Impedit, illo!
                                </a>
                            </div>
                            <small>By <span>Jessel Zapanta</span></small>
                        </div>
                    </div>
                </div>
            </main>
            <div className="to_top">
                <i className="bx bx-up-arrow-alt"></i>
            </div>
            <footer>
                <div className="line"></div>
                <div className="footer_content">
                    <div className="torch">
                        <h2>The Torch Publication</h2>
                        <p>
                            The Torch is Tangub City Global College's official
                            publication. "Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </p>
                    </div>
                    <div className="socials">
                        <div className="social">
                            <i className="bx bxl-facebook-circle"></i>
                            <a href="">The Torch</a>
                        </div>
                        <div className="social">
                            <i className="bx bxs-envelope"></i>
                            <a href="">torch@gmail.com</a>
                        </div>
                    </div>
                </div>
                <small className="copy">©Torch Publication| All Rights Reserved</small>
            </footer>
        </GuestLayout>
          
        </>
    );
}
