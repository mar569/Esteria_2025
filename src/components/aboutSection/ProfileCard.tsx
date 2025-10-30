import React from 'react';

import me from '../../assets/me.png';

const ProfileCard: React.FC = () => {
    return (
        <div
            className="pc-card-wrapper"
        >
            <section className="pc-card">
                <div className="pc-inside">
                    <div className="pc-content pc-avatar-content">
                        <img
                            className="avatar"
                            src={me}
                            alt="Марианна Владимировна"
                            loading="lazy"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                        <div className="pc-user-info">
                            <div className="pc-user-details">
                                <div className="pc-mini-avatar">
                                    <img
                                        src={me}
                                        alt="Марианна Владимировна mini avatar"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="pc-user-text">
                                    <div className="pc-handle">@marianna_cosmo</div>
                                    <div className="pc-status">Индивидуальный подход</div>
                                </div>
                            </div>
                            <button
                                className="pc-contact-btn"
                                onClick={() => console.log('Contact clicked')}
                                style={{ pointerEvents: 'auto' }}
                                type="button"
                                aria-label="Записаться к Марианне Владимировне"
                            >
                                Записаться
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfileCard;