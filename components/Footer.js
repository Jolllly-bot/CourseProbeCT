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
            {" "}|{" "}
            <a href="https://github.com/Jolllly-bot/CourseProbeCT#commuity-guidelines">
              Community Guildelines
            </a>
            <br />
            Suggestions and bug report:{" "}
            <a href="https://github.com/Jolllly-bot/CourseProbeCT">
              GitHub
            </a>            
          </p>

      </div>
    </footer>
  );
};

export default Footer;
