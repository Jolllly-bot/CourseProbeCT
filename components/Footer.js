import Link from "next/link";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="content has-text-centered">
          <p>
            <strong>Course Probe</strong> for{" "}
            <a href="https://tech.cornell.edu">
              Cornell Tech
            </a>
            <br />
            Suggestions and Bug Report:{" "}
            <a href="https://github.com/Jolllly-bot/CourseProbeCT">
              GitHub
            </a>            
            {" "}|{" "}
            <a href="https://github.com/Jolllly-bot/CourseProbeCT#commuity-guidelines">
              Community Guildelines
            </a>
          </p>

      </div>
    </footer>
  );
};

export default Footer;
