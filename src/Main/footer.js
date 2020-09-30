import React from "react";
import "./footer.less";

export default class footer extends React.Component {
	fb() {
		window.open(
			"https://www.facebook.com/%E5%8D%94%E6%B2%BB%E4%BC%81%E6%A5%AD-100924884979877"
		);
	}

	line() {
		window.open("https://lin.ee/q9TI5AL");
	}

	render() {
		return (
			<div id="footer">
				<div class="rows">
					<div class="footer-socal">
						<div onClick={this.fb.bind(this)} class="footer-fb">
							<div class="arr"></div>
						</div>
						<div onClick={this.line.bind(this)} class="footer-line">
							<div class="arr"></div>
						</div>
						<div class="footer-txt">免費提供回收諮詢歡迎與我們聯絡</div>
					</div>
					<div class="footer-copyright">
						Copyright © 2020 SHYECHIC ENTERPRISE
					</div>
				</div>
			</div>
		);
	}
}
