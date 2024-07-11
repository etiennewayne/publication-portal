
<script>
import { Link } from '@inertiajs/vue3';


export default {

    components: {
        Link
    },


    data() {
        return {

        };
    },


    methods: {},

    mounted() {

        const btn = document.getElementById("menu_btn");
        const sidebar = document.getElementById("sidebar");

        btn.addEventListener("click", () => {
            sidebar.classList.toggle("active");
        });

        // Freedom container hide
        //var freedomWall = document.querySelector(".freedom_wall");

        //Modal for policy
        // var modalPolicy = document.getElementById("modalPolicy");
        // var openPolicy = document.getElementById("openPolicy");
        // var closePolicy = document.getElementById("closePolicy");

        // openPolicy.onclick = function () {
        //     modalPolicy.style.display = "block";
        //     freedomWall.style.display = "none";
        // };

        // closePolicy.onclick = function () {
        //     modalPolicy.style.display = "none";
        //     freedomWall.style.display = "block";
        // };

        // window.onclick = function (event) {
        //     if (event.target == modalPolicy) {
        //         modalPolicy.style.display = "none";
        //     }
        // };

        //Modal for Write Anonymously
        // var modalWrite = document.getElementById("modalWrite");


        // var openWrite = document.getElementById("openWrite");
        // var closeWrite = document.getElementById("closeWrite");

        // openWrite.onclick = function () {
        //     modalWrite.style.display = "block";

        //     freedomWall.style.display = "none";
        // };

        // closeWrite.onclick = function () {
        //     modalWrite.style.display = "none";

        //     freedomWall.style.display = "block";
        // };

        // window.onclick = function (event) {
        //     if (event.target == modalWrite) {

        //         modalWrite.style.display = "none";

        //         freedomWall.style.display = "block";
        //     }
        // };

        // report
        // document.querySelectorAll(".reportBtn").forEach((button) => {
        //     button.addEventListener("click", function () {
        //         // Find the closest .report element and then toggle the .report_modal inside it
        //         const reportModal =
        //             this.closest(".report").querySelector(".report_modal");
        //         reportModal.classList.toggle("show");
        //     });
        // });

        // text to speech
        // document.querySelectorAll(".tts").forEach((ttsButton) => {
        //     let isSpeaking = false;
        //     let utterance;

        //     ttsButton.addEventListener("click", () => {
        //         const content = ttsButton.previousElementSibling.textContent;

        //         if (!isSpeaking) {
        //             utterance = new SpeechSynthesisUtterance(content);
        //             speechSynthesis.speak(utterance);
        //             isSpeaking = true;
        //         } else {
        //             if (speechSynthesis.speaking) {
        //                 speechSynthesis.pause();
        //             } else {
        //                 speechSynthesis.resume();
        //             }
        //             isSpeaking = false;
        //         }
        //     });
        // });
    },
    
};
</script>

<template>
    <div class="main_container">
        <div class="top_header">
            <div class="logo">
                <div class="img_container logo">
                    <a href="index.html">
                        <img src="img/torch.png" alt="" />
                    </a>
                </div>
            </div>
            <div class="system_title">
                <h1>The Torch</h1>
                <h2>Publication System</h2>
            </div>
            <div class="menu_container">
                <i id="menu_btn" class="bx bx-menu menu_btn"></i>
                <!-- Show if  Auth -->
                <!-- <div class="img_container user_profile" id="menu_btn">
                        <img src="/img/looool.jpg" alt="" />
                    </div> -->
            </div>
        </div>

        <!-- sidebar -->
        <div class="sidebar" id="sidebar">
            <div class="sidebar_content">
                <Link href="/login">
                    <i class="bx bx-log-in"></i>
                    Log In
                </Link>
            </div>
            <!-- show when Auth -->
            <div class="sidebar_content">
                <a href="/admin/adminDashboard.html"
                    ><i class="bx bxs-dashboard"></i>Dashboard</a
                >
            </div>
            <div class="line"></div>
            <div class="sidebar_links">
                <h6 class="sidebar_title">Navigation</h6>
                <div class="sidebar_content">
                    <a href="/index.html"
                        ><i class="bx bxs-basketball"></i>Home</a
                    >
                </div>
                <div class="sidebar_content">
                    <a href="/reccommedation.html"
                        ><i class="bx bxs-basketball"></i>Recommendation</a
                    >
                </div>
                <div class="sidebar_content">
                    <a href=""
                        ><i class="bx bxs-basketball"></i>The Torch Articles</a
                    >
                </div>
                <div class="sidebar_content">
                    <a href=""><i class="bx bxs-basketball"></i>Freedom Wall</a>
                </div>
            </div>
        </div>

        <nav>
            <a href="/index.html" class="active">Home</a>
            <a href="/reccommedation.html">Recommendation</a>
            <a href="/torchFeed.html">The Torch Articles</a>
            <a href="/studentFeed.html">Students Feed</a>
            <a href="/freedomWall.html">Freedom Wall</a>
        </nav>
        <main class="main">
            <div class="featured_container">
                <div class="featured_content">
                    <div class="img_container featured">
                        <img
                            src="/img/image.png"
                            alt="THIS IS A FEATURED ARTICLE IMAGE"
                        />
                    </div>
                    <div class="featured_title">
                        <div class="featured_btns">
                            <h4>FEATURED ARTICLE</h4>
                            <a class="title" href="/article.html"
                                >Barangay Canibungan Proper Residents to Benefit
                                From New KALAHI-Funded Road</a
                            >
                        </div>
                        <small>By <span>Jessel Zapanta</span></small>
                    </div>
                </div>
            </div>
            <!-- Main side post (most popular) -->
            <div class="main_post_container">
                <!--  -->
                <div class="post">
                    <div class="img_container side_post">
                        <img src="/img/image.png" alt="" />
                    </div>
                    <div class="post_info">
                        <div class="post_btns">
                            <a href="" class="category_title">NEWS</a>
                            <a href="" class="post_title">
                                most viewed,like,comment, ratings,reading
                                time(sa article, with analytics sa admin og sa
                                ga publish)
                            </a>
                        </div>
                        <small>By <span>Jessel Zapanta</span></small>
                    </div>
                </div>
                <!--  -->
                <div class="post">
                    <div class="img_container side_post">
                        <img src="/img/TORCH INFOGRAPHICS (1).png" alt="" />
                    </div>
                    <div class="post_info">
                        <div class="post_btns">
                            <a href="" class="category_title">NEWS</a>
                            <a href="" class="post_title">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Impedit, illo!
                            </a>
                        </div>
                        <small>By <span>Jessel Zapanta</span></small>
                    </div>
                </div>
                <!--  -->
                <div class="post">
                    <div class="img_container side_post">
                        <img src="/img/bg_new.png" alt="" />
                    </div>
                    <div class="post_info">
                        <div class="post_btns">
                            <a href="" class="category_title">NEWS</a>
                            <a href="" class="post_title">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Impedit, illo!
                            </a>
                        </div>
                        <small>By <span>Jessel Zapanta</span></small>
                    </div>
                </div>
            </div>
        </main>
        <div class="to_top">
            <i class="bx bx-up-arrow-alt"></i>
        </div>
        <footer>
            <div class="line"></div>
            <div class="footer_content">
                <div class="torch">
                    <h2>The Torch Publication</h2>
                    <p>
                        The Torch is Tangub City Global College's official
                        publication. "Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </div>
                <div class="socials">
                    <div class="social">
                        <i class="bx bxl-facebook-circle"></i>
                        <a href="">The Torch</a>
                    </div>
                    <div class="social">
                        <i class="bx bxs-envelope"></i>
                        <a href="">torch@gmail.com</a>
                    </div>
                </div>
            </div>
            <small class="copy">©Torch Publication| All Rights Reserved</small>
        </footer>
    </div>
</template>