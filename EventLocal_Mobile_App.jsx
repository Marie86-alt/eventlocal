import React, { useState, useEffect, useRef } from 'react';

const EventLocalApp = () => {
  const [currentView, setCurrentView] = useState('map');
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Marie Dubois',
      senderLang: 'fr',
      originalText: 'Bonjour ! Le marché commence à 8h demain matin. N\'hésitez pas si vous avez des questions !',
      timestamp: '10:30',
      isBot: false
    },
    {
      id: 2,
      sender: 'John Smith',
      senderLang: 'en',
      originalText: 'Hello! What time does it finish? I would like to come with my family.',
      timestamp: '10:35',
      isBot: false
    },
    {
      id: 3,
      sender: 'Marie Dubois',
      senderLang: 'fr',
      originalText: 'Le marché se termine à 13h. Vous êtes les bienvenus avec votre famille !',
      timestamp: '10:37',
      isBot: false
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showTranslation, setShowTranslation] = useState(true);
  const messagesEndRef = useRef(null);

  // Simulation de traductions (dans une vraie app, ce serait via une API comme DeepL ou Google Translate)
  const translations = {
    fr: {
      'Hello! What time does it finish? I would like to come with my family.': 'Bonjour ! À quelle heure cela se termine-t-il ? J\'aimerais venir avec ma famille.',
      'Thank you very much! See you tomorrow!': 'Merci beaucoup ! À demain !',
      'The market starts at 8am tomorrow morning. Feel free to ask if you have questions!': 'Le marché commence à 8h demain matin. N\'hésitez pas si vous avez des questions !'
    },
    en: {
      'Bonjour ! Le marché commence à 8h demain matin. N\'hésitez pas si vous avez des questions !': 'Hello! The market starts at 8am tomorrow morning. Feel free to ask if you have questions!',
      'Le marché se termine à 13h. Vous êtes les bienvenus avec votre famille !': 'The market finishes at 1pm. You are welcome with your family!',
      'Merci beaucoup ! À demain !': 'Thank you very much! See you tomorrow!'
    },
    es: {
      'Bonjour ! Le marché commence à 8h demain matin. N\'hésitez pas si vous avez des questions !': '¡Hola! El mercado comienza a las 8h mañana por la mañana. ¡No dude en preguntar si tiene dudas!',
      'Hello! What time does it finish? I would like to come with my family.': '¡Hola! ¿A qué hora termina? Me gustaría venir con mi familia.',
      'Le marché se termine à 13h. Vous êtes les bienvenus avec votre famille !': 'El mercado termina a las 13h. ¡Son bienvenidos con su familia!'
    }
  };

  const translateMessage = (text, targetLang, sourceLang) => {
    if (targetLang === sourceLang) return text;
    return translations[targetLang]?.[text] || `[Traduction ${targetLang}] ${text}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'Vous',
        senderLang: selectedLanguage,
        originalText: newMessage,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isBot: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const languages = [
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
    { code: 'it', flag: '🇮🇹', name: 'Italiano' }
  ];

  const events = [
    {
      id: 1,
      title: 'Marché de Provence',
      type: 'market',
      icon: '🛍️',
      date: 'Sam. 26 oct. 2025, 8h-13h',
      location: 'Place du Village, Aix-en-Provence',
      organizer: 'Marie Dubois',
      distance: '2.3 km',
      status: 'live',
      color: '#0055A4'
    },
    {
      id: 2,
      title: 'Fête du Village',
      type: 'festival',
      icon: '🎉',
      date: 'Dim. 27 oct. 2025, 14h-22h',
      location: 'Centre-ville, Saint-Rémy',
      organizer: 'Mairie de Saint-Rémy',
      distance: '5.8 km',
      status: 'tomorrow',
      color: '#EF4135'
    },
    {
      id: 3,
      title: 'Concert Jazz en Plein Air',
      type: 'concert',
      icon: '🎵',
      date: 'Mer. 30 oct. 2025, 19h00',
      location: 'Parc des Lices, Avignon',
      organizer: 'Jazz Provence',
      distance: '8.5 km',
      status: '3 jours',
      color: '#764ba2'
    }
  ];

  return (
    <div style={styles.container}>
      {/* App Container - Mobile View */}
      <div style={styles.phoneFrame}>
        {/* Status Bar */}
        <div style={styles.statusBar}>
          <span>9:41</span>
          <div style={styles.statusIcons}>
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.logoIcon}>📍</div>
            <span style={styles.logoText}>EventLocal</span>
          </div>
          <div style={styles.headerRight}>
            <button style={styles.iconButton}>🔔</button>
            <button style={styles.iconButton}>⚙️</button>
          </div>
        </div>

        {/* Language Selector */}
        <div style={styles.languageBar}>
          <span style={styles.languageLabel}>🌍 Votre langue:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={styles.languageSelect}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {currentView === 'map' && (
            <div style={styles.viewContainer}>
              {/* Search Bar */}
              <div style={styles.searchSection}>
                <input
                  type="text"
                  placeholder="🔍 Rechercher un événement..."
                  style={styles.searchInput}
                />
                <select style={styles.radiusSelect}>
                  <option>10 km</option>
                  <option>25 km</option>
                  <option>50 km</option>
                </select>
              </div>

              {/* Map */}
              <div style={styles.mapContainer}>
                <div style={styles.mapPlaceholder}>
                  <div style={styles.mapIcon}>🗺️</div>
                  <p style={styles.mapText}>Carte interactive</p>
                  <p style={styles.mapSubtext}>Événements géolocalisés</p>
                </div>
                <div style={styles.marker1}>📍</div>
                <div style={styles.marker2}>📍</div>
                <div style={styles.marker3}>📍</div>
              </div>

              {/* Events List */}
              <div style={styles.eventsList}>
                <h3 style={styles.sectionTitle}>📅 Événements à proximité</h3>
                {events.map(event => (
                  <div key={event.id} style={styles.eventCard}>
                    <div style={{ ...styles.eventIcon, background: event.color }}>
                      {event.icon}
                    </div>
                    <div style={styles.eventContent}>
                      <div style={styles.eventHeader}>
                        <h4 style={styles.eventTitle}>{event.title}</h4>
                        <span style={{
                          ...styles.eventBadge,
                          ...(event.status === 'live' ? styles.eventBadgeLive : {})
                        }}>
                          {event.status === 'live' ? '🔴 Live' : event.status}
                        </span>
                      </div>
                      <p style={styles.eventDetail}>📅 {event.date}</p>
                      <p style={styles.eventDetail}>📍 {event.location}</p>
                      <div style={styles.eventFooter}>
                        <span style={styles.eventDistance}>📍 {event.distance}</span>
                        <button style={styles.viewButton}>Voir</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'chat' && (
            <div style={styles.viewContainer}>
              <div style={styles.chatContainer}>
                {/* Translation Info Banner */}
                <div style={styles.translationBanner}>
                  <span>🌐</span>
                  <div style={styles.translationInfo}>
                    <div style={styles.translationTitle}>Traduction automatique activée</div>
                    <div style={styles.translationSubtitle}>
                      Messages traduits en {languages.find(l => l.code === selectedLanguage)?.name}
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowTranslation(!showTranslation)}
                    style={styles.toggleButton}
                  >
                    {showTranslation ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>

                {/* Messages */}
                <div style={styles.messagesContainer}>
                  {messages.map(message => {
                    const isCurrentUser = message.sender === 'Vous';
                    const translatedText = translateMessage(
                      message.originalText,
                      selectedLanguage,
                      message.senderLang
                    );
                    const needsTranslation = message.senderLang !== selectedLanguage;

                    return (
                      <div
                        key={message.id}
                        style={{
                          ...styles.messageWrapper,
                          justifyContent: isCurrentUser ? 'flex-end' : 'flex-start'
                        }}
                      >
                        <div style={styles.messageContainer}>
                          {!isCurrentUser && (
                            <div style={styles.messageSender}>
                              {message.sender} {languages.find(l => l.code === message.senderLang)?.flag}
                            </div>
                          )}
                          
                          <div
                            style={{
                              ...styles.messageBubble,
                              ...(isCurrentUser ? styles.messageBubbleUser : styles.messageBubbleOther)
                            }}
                          >
                            {/* Translated Message */}
                            {needsTranslation && showTranslation ? (
                              <>
                                <div style={styles.messageText}>{translatedText}</div>
                                <div style={styles.originalTextCollapsed}>
                                  <span style={styles.originalLabel}>
                                    Original ({message.senderLang.toUpperCase()}):
                                  </span>
                                  <span style={styles.originalText}>{message.originalText}</span>
                                </div>
                              </>
                            ) : (
                              <div style={styles.messageText}>{message.originalText}</div>
                            )}
                          </div>
                          
                          <div
                            style={{
                              ...styles.messageTime,
                              textAlign: isCurrentUser ? 'right' : 'left'
                            }}
                          >
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div style={styles.chatInput}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={`Écrivez en ${languages.find(l => l.code === selectedLanguage)?.name}...`}
                    style={styles.messageInput}
                  />
                  <button onClick={sendMessage} style={styles.sendButton}>
                    ➤
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentView === 'ai' && (
            <div style={styles.viewContainer}>
              <div style={styles.aiContainer}>
                <div style={styles.aiHeader}>
                  <div style={styles.aiAvatar}>🤖</div>
                  <div>
                    <h3 style={styles.aiTitle}>Assistant IA</h3>
                    <p style={styles.aiSubtitle}>Modérateur & Assistant intelligent</p>
                  </div>
                </div>
                
                <div style={styles.aiFeatures}>
                  <div style={styles.aiFeatureCard}>
                    <div style={styles.aiFeatureIcon}>🛡️</div>
                    <h4 style={styles.aiFeatureTitle}>Modération automatique</h4>
                    <p style={styles.aiFeatureText}>
                      Détection et filtrage des contenus inappropriés, spam et messages abusifs
                    </p>
                  </div>
                  
                  <div style={styles.aiFeatureCard}>
                    <div style={styles.aiFeatureIcon}>💬</div>
                    <h4 style={styles.aiFeatureTitle}>Chatbot intelligent</h4>
                    <p style={styles.aiFeatureText}>
                      Réponses instantanées aux questions sur les événements, horaires et lieux
                    </p>
                  </div>
                  
                  <div style={styles.aiFeatureCard}>
                    <div style={styles.aiFeatureIcon}>🌐</div>
                    <h4 style={styles.aiFeatureTitle}>Traduction en temps réel</h4>
                    <p style={styles.aiFeatureText}>
                      Traduction automatique des messages dans la langue de chaque utilisateur
                    </p>
                  </div>
                  
                  <div style={styles.aiFeatureCard}>
                    <div style={styles.aiFeatureIcon}>🎯</div>
                    <h4 style={styles.aiFeatureTitle}>Recommandations</h4>
                    <p style={styles.aiFeatureText}>
                      Suggestions d'événements personnalisées selon vos préférences et localisation
                    </p>
                  </div>
                </div>

                <div style={styles.aiChatDemo}>
                  <p style={styles.aiPrompt}>Posez une question à l'assistant:</p>
                  <div style={styles.quickActions}>
                    <button style={styles.quickAction}>🛍️ Marchés aujourd'hui</button>
                    <button style={styles.quickAction}>🎉 Fêtes ce weekend</button>
                    <button style={styles.quickAction}>🎵 Concerts à venir</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div style={styles.bottomNav}>
          <button
            onClick={() => setCurrentView('map')}
            style={{
              ...styles.navButton,
              ...(currentView === 'map' ? styles.navButtonActive : {})
            }}
          >
            <span style={styles.navIcon}>🗺️</span>
            <span style={styles.navLabel}>Carte</span>
          </button>
          
          <button
            onClick={() => setCurrentView('chat')}
            style={{
              ...styles.navButton,
              ...(currentView === 'chat' ? styles.navButtonActive : {})
            }}
          >
            <span style={styles.navIcon}>💬</span>
            <span style={styles.navLabel}>Messages</span>
            <span style={styles.badge}>3</span>
          </button>
          
          <button
            onClick={() => setCurrentView('ai')}
            style={{
              ...styles.navButton,
              ...(currentView === 'ai' ? styles.navButtonActive : {})
            }}
          >
            <span style={styles.navIcon}>🤖</span>
            <span style={styles.navLabel}>Assistant IA</span>
          </button>
          
          <button style={styles.navButton}>
            <span style={styles.navIcon}>👤</span>
            <span style={styles.navLabel}>Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  phoneFrame: {
    width: '100%',
    maxWidth: '420px',
    height: '90vh',
    maxHeight: '900px',
    background: '#fff',
    borderRadius: '40px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  statusBar: {
    height: '25px',
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#2c3e50'
  },
  statusIcons: {
    display: 'flex',
    gap: '5px'
  },
  header: {
    background: '#fff',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e0e6ed',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logoIcon: {
    width: '35px',
    height: '35px',
    background: 'linear-gradient(135deg, #0055A4 0%, #EF4135 100%)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px'
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #0055A4 0%, #EF4135 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  headerRight: {
    display: 'flex',
    gap: '10px'
  },
  iconButton: {
    width: '35px',
    height: '35px',
    border: 'none',
    background: '#f0f4f8',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  languageBar: {
    background: '#f8f9fa',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e0e6ed',
    fontSize: '13px'
  },
  languageLabel: {
    fontWeight: '600',
    color: '#2c3e50'
  },
  languageSelect: {
    padding: '8px 12px',
    border: '2px solid #0055A4',
    borderRadius: '10px',
    background: '#fff',
    color: '#2c3e50',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    outline: 'none',
    minWidth: '150px'
  },
  mainContent: {
    flex: 1,
    overflow: 'hidden',
    background: '#f5f7fa'
  },
  viewContainer: {
    height: '100%',
    overflow: 'auto'
  },
  searchSection: {
    padding: '15px',
    background: '#fff',
    display: 'flex',
    gap: '8px',
    borderBottom: '1px solid #e0e6ed'
  },
  searchInput: {
    flex: 1,
    padding: '10px 15px',
    border: '2px solid #e0e6ed',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none'
  },
  radiusSelect: {
    padding: '10px',
    border: '2px solid #e0e6ed',
    borderRadius: '10px',
    fontSize: '14px',
    background: '#fff',
    cursor: 'pointer',
    outline: 'none'
  },
  mapContainer: {
    height: '250px',
    background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
    position: 'relative',
    margin: '15px',
    borderRadius: '15px',
    overflow: 'hidden'
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0055A4'
  },
  mapIcon: {
    fontSize: '50px',
    marginBottom: '10px'
  },
  mapText: {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0
  },
  mapSubtext: {
    fontSize: '12px',
    margin: '5px 0 0 0',
    opacity: 0.7
  },
  marker1: {
    position: 'absolute',
    top: '30%',
    left: '35%',
    fontSize: '30px',
    animation: 'bounce 2s infinite'
  },
  marker2: {
    position: 'absolute',
    top: '55%',
    left: '65%',
    fontSize: '30px',
    animation: 'bounce 2s infinite 0.3s'
  },
  marker3: {
    position: 'absolute',
    top: '45%',
    left: '25%',
    fontSize: '30px',
    animation: 'bounce 2s infinite 0.6s'
  },
  eventsList: {
    padding: '15px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '15px'
  },
  eventCard: {
    background: '#fff',
    borderRadius: '15px',
    padding: '15px',
    marginBottom: '12px',
    display: 'flex',
    gap: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  eventIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    flexShrink: 0
  },
  eventContent: {
    flex: 1,
    minWidth: 0
  },
  eventHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '8px',
    gap: '8px'
  },
  eventTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: 0,
    flex: 1
  },
  eventBadge: {
    background: '#e3f2fd',
    color: '#0055A4',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    whiteSpace: 'nowrap'
  },
  eventBadgeLive: {
    background: '#ffebee',
    color: '#EF4135'
  },
  eventDetail: {
    fontSize: '12px',
    color: '#5a6c7d',
    margin: '4px 0'
  },
  eventFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px'
  },
  eventDistance: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#0055A4'
  },
  viewButton: {
    background: 'linear-gradient(135deg, #0055A4 0%, #003d7a 100%)',
    color: '#fff',
    border: 'none',
    padding: '6px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  chatContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff'
  },
  translationBanner: {
    background: 'linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 100%)',
    padding: '12px 15px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid #e0e6ed',
    fontSize: '24px'
  },
  translationInfo: {
    flex: 1
  },
  translationTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#0055A4',
    marginBottom: '2px'
  },
  translationSubtitle: {
    fontSize: '11px',
    color: '#5a6c7d'
  },
  toggleButton: {
    background: '#fff',
    border: '2px solid #0055A4',
    borderRadius: '8px',
    padding: '6px 10px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  messageWrapper: {
    display: 'flex',
    width: '100%'
  },
  messageContainer: {
    maxWidth: '80%',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  messageSender: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#5a6c7d',
    marginBottom: '4px'
  },
  messageBubble: {
    padding: '12px 15px',
    borderRadius: '15px',
    wordWrap: 'break-word'
  },
  messageBubbleUser: {
    background: 'linear-gradient(135deg, #0055A4 0%, #003d7a 100%)',
    color: '#fff',
    borderBottomRightRadius: '5px'
  },
  messageBubbleOther: {
    background: '#f0f4f8',
    color: '#2c3e50',
    borderBottomLeftRadius: '5px'
  },
  messageText: {
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '6px'
  },
  originalTextCollapsed: {
    fontSize: '11px',
    opacity: 0.8,
    borderTop: '1px solid rgba(255,255,255,0.2)',
    paddingTop: '6px',
    marginTop: '6px',
    fontStyle: 'italic',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },
  originalLabel: {
    fontWeight: '600',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  originalText: {
    opacity: 0.9
  },
  messageTime: {
    fontSize: '10px',
    color: '#5a6c7d',
    opacity: 0.7
  },
  chatInput: {
    padding: '12px 15px',
    borderTop: '1px solid #e0e6ed',
    display: 'flex',
    gap: '8px',
    background: '#fff'
  },
  messageInput: {
    flex: 1,
    padding: '10px 15px',
    border: '2px solid #e0e6ed',
    borderRadius: '20px',
    fontSize: '14px',
    outline: 'none'
  },
  sendButton: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #0055A4 0%, #003d7a 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  aiContainer: {
    padding: '20px'
  },
  aiHeader: {
    background: 'linear-gradient(135deg, #0055A4 0%, #003d7a 100%)',
    borderRadius: '15px',
    padding: '20px',
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    color: '#fff',
    marginBottom: '20px'
  },
  aiAvatar: {
    width: '60px',
    height: '60px',
    background: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '35px',
    flexShrink: 0
  },
  aiTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 0 5px 0'
  },
  aiSubtitle: {
    fontSize: '13px',
    opacity: 0.9,
    margin: 0
  },
  aiFeatures: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
    marginBottom: '20px'
  },
  aiFeatureCard: {
    background: '#fff',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    display: 'flex',
    gap: '12px',
    alignItems: 'start'
  },
  aiFeatureIcon: {
    fontSize: '30px',
    flexShrink: 0
  },
  aiFeatureTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#0055A4',
    margin: '0 0 5px 0'
  },
  aiFeatureText: {
    fontSize: '12px',
    color: '#5a6c7d',
    lineHeight: '1.5',
    margin: 0
  },
  aiChatDemo: {
    background: '#fff',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  aiPrompt: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '12px'
  },
  quickActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  quickAction: {
    background: 'linear-gradient(135deg, #f0f4f8 0%, #e3f2fd 100%)',
    border: '2px solid transparent',
    padding: '12px 15px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'left',
    color: '#2c3e50',
    transition: 'all 0.3s'
  },
  bottomNav: {
    display: 'flex',
    background: '#fff',
    borderTop: '1px solid #e0e6ed',
    paddingBottom: '10px',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
  },
  navButton: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 5px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.3s'
  },
  navButtonActive: {
    color: '#0055A4'
  },
  navIcon: {
    fontSize: '22px',
    marginBottom: '4px'
  },
  navLabel: {
    fontSize: '11px',
    fontWeight: '500'
  },
  badge: {
    position: 'absolute',
    top: '8px',
    right: '20%',
    background: '#EF4135',
    color: '#fff',
    fontSize: '10px',
    fontWeight: '600',
    padding: '2px 6px',
    borderRadius: '10px',
    minWidth: '18px',
    textAlign: 'center'
  }
};

export default EventLocalApp;
