import { Component } from "react";
import colors from "../constants/colors";

// ─────────────────────────────────────────────────────────────────
//  ERROR BOUNDARY — catches render errors with fallback UI
//  @react-patterns: Error Boundary at root level
//  @react-ui-patterns: Error state with retry action
// ─────────────────────────────────────────────────────────────────
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: colors.bg,
                        fontFamily: "'Jost', system-ui, sans-serif",
                        color: colors.cream,
                        textAlign: "center",
                        padding: "2rem",
                    }}
                >
                    <span style={{ fontSize: "3rem", marginBottom: "1rem" }}>🐱</span>
                    <h1
                        style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "2rem",
                            fontWeight: 300,
                            marginBottom: "0.8rem",
                        }}
                    >
                        Oops! Myra knocked something over.
                    </h1>
                    <p style={{ color: colors.muted, fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                        Something went wrong. Please try again.
                    </p>
                    <button
                        onClick={this.handleRetry}
                        className="btn-primary"
                        style={{ cursor: "pointer" }}
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
